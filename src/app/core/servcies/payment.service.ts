import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { API } from '../api';
import { RazorpayOrder, RazorpayPayment } from '../interfaces/payment';
import { HttpRequestService } from './http-request.service';

function _window(): any {
  return window;
}

@Injectable()
export class PaymentService {

  paymentStatus = new BehaviorSubject<boolean>(false);

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private messageService: MessageService,
    private router: Router,
    private http: HttpRequestService
  ) { }

  get nativeWindow(): any {
    if (isPlatformBrowser(this.platformId)) {
      return _window();
    }
  }

  createOrder(payload: any) {
    return this.http.post(API.order.create, payload);
  }

  private confirmOrder(payload: any) {
    return this.http.post(API.order.confirm, payload);
  }

  makePayment(paymentData: RazorpayPayment) {
    this.payWithRazor(paymentData);
  }

  private payWithRazor(data: RazorpayPayment) {
    const options: any = {
      key: environment.RAZORPAY_KEY,
      amount: data.amount * 100,
      currency: 'INR',
      name: 'NIS',
      description: 'Invoice Transaction',
      image: '',
      order_id: data.order_id || '',
      modal: {
        escape: false,
      },
      prefill: {
        name: data.name,
        email: data.email,
        contact: data.contact
      },
      theme: {
        color: '#6366F1'
      }
    };
    options.handler = ((response: RazorpayOrder, error: any) => {
      console.log(response);
      if (error) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
        return;
      }
      const payload = {
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        signature: response.razorpay_signature
      }
      this.confirmOrder(payload).subscribe();
      this.paymentStatus.next(true);
      this.router.navigate(['/dashboard']);
    });
    options.modal.ondismiss = (() => {
      console.log('Transaction cancelled.');
      this.messageService.add({ severity: 'warn', summary: 'Transaction Cancelled', detail: 'Your transaction was cancelled.' });
    });
    const rzp = new this.nativeWindow.Razorpay(options);
    rzp.open();
  }
}