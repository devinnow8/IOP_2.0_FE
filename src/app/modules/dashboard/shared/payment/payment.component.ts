import { Component, OnInit } from '@angular/core';
import { Payment } from '@app/core/interfaces/payment';
import { WindowService } from '@app/core/servcies/window.service';
import { environment } from '@env/environment';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  stripe: any;
  stripeElements: any;
  paymentData!: Payment;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private messageService: MessageService,
    private window: WindowService
  ) {
    console.log(config)
    this.paymentData = config.data;
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.stripe = this.window.nativeWindow.Stripe(environment.STRIPE_PK);

    this.stripeElements = this.stripe.elements({
      clientSecret: this.paymentData.order_id
    });
    const paymentElement = this.stripeElements.create('payment');
    paymentElement.mount('#payment-element');
  }

  submit() {
    const elements = this.stripeElements;
    const config = {
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/dashboard/payment-status`,
        payment_method_data: {
          billing_details: {
            name: this.paymentData.name,
            email: this.paymentData.email
          }
        },
      },
    }
    this.stripe.confirmPayment(config)
      .then((result: any) => {
        console.log(result)
        if (result.error) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: result.error.message });
          return;
        }
        this.close();
      });
  }

  close() {
    this.ref.close();
  }

}
