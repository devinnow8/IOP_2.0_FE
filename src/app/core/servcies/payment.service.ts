import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { API } from '../api';
import { Payment, RazorpayOrder } from '../interfaces/payment';
import { HttpRequestService } from './http-request.service';
import { DialogService } from 'primeng/dynamicdialog';
import { PaymentComponent } from '@app/modules/dashboard/shared/payment/payment.component';

function _window(): any {
  return window;
}

@Injectable()
export class PaymentService {

  paymentStatus = new BehaviorSubject<boolean>(false);
  paymentHandler: any = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private messageService: MessageService,
    private router: Router,
    private http: HttpRequestService,
    public dialogService: DialogService
  ) { }

  get nativeWindow(): any {
    if (isPlatformBrowser(this.platformId)) {
      return _window();
    }
  }

  createOrder(payload: any) {
    return this.http.post(API.order.create, payload);
  }

  confirmOrder(payload: any) {
    return this.http.post(API.order.confirm, payload);
  }

  makePayment(paymentData: Payment) {
    if (paymentData.gateway === 'razorpay') {
      this.payWithRazor(paymentData);
    } else {
      this.payWithStripe(paymentData);
    }
  }

  private payWithRazor(data: Payment) {
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
        signature: response.razorpay_signature,
        gateway: data.gateway
      }
      this.confirmOrder(payload).subscribe(res => {
        this.paymentStatus.next(true);
      });
      this.router.navigate(['/dashboard']);
    });
    options.modal.ondismiss = (() => {
      console.log('Transaction cancelled.');
    });
    const rzp = new this.nativeWindow.Razorpay(options);
    rzp.open();
  }

  payWithStripe(data: Payment) {
    this.dialogService.open(PaymentComponent, { 
      data: data,
      header: 'Stripe Payment'
  });
    // this.invokeStripe();
    // setTimeout(() => {
    //   const paymentHandler = this.nativeWindow.StripeCheckout.configure({
    //     key: environment.STRIPE_PK,
    //     locale: 'auto',
    //     token: (stripeToken: any) => {
    //       console.log(stripeToken);
    //       const payload = {
    //         signature: stripeToken.id,
    //         gateway: data.gateway
    //       }
    //       this.confirmOrder(payload).subscribe(res => {
    //         this.paymentStatus.next(true);
    //       });
    //       this.router.navigate(['/dashboard']);
    //     },
    //   });
    //   paymentHandler.open({
    //     name: 'NIS',
    //     amount: data.amount * 100,
    //   });
    // }, 1000);
  }

  // invokeStripe() {
  //   if (!window.document.getElementById('stripe-script')) {
  //     const script = window.document.createElement('script');

  //     script.id = 'stripe-script';
  //     script.type = 'text/javascript';
  //     script.src = 'https://checkout.stripe.com/checkout.js';
  //     script.onload = () => {
  //       this.paymentHandler = this.nativeWindow.StripeCheckout.configure({
  //         key: environment.STRIPE_PK,
  //         locale: 'auto',
  //         token: function (stripeToken: any) {
  //           console.log(stripeToken);
  //           alert('Payment has been successfull!');
  //         },
  //       });
  //     };

  //     window.document.body.appendChild(script);
  //   }
  // }
}