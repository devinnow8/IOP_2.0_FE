import { Component, OnInit } from '@angular/core';
import { PaymentService } from '@app/core/servcies/payment.service';
import { WindowService } from '@app/core/servcies/window.service';
import { environment } from '@env/environment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit {

  message: string = '';

  constructor(
    private paymentService: PaymentService,
    private messageService: MessageService,
    private window: WindowService
  ) {

  }

  ngOnInit(): void {
    this.paymentStatus();
  }

  paymentStatus() {
    const stripe = this.window.nativeWindow.Stripe(environment.STRIPE_PK);
    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) return;

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }: any) => {
      console.log(paymentIntent)
      switch (paymentIntent.status) {
        case 'succeeded':
          this.message = 'Success! Payment received.';
          const payload = {
            razorpay_order_id: paymentIntent.client_secret,
            razorpay_payment_id: '',
            signature: paymentIntent.id,
            gateway: 'stripe',
            status: 'Complete'
          }
          this.paymentService.confirmOrder(payload).subscribe(res => { 
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Payment Confirmed' });
          });
          break;

        case 'processing':
          this.message = "Payment processing. We'll update you when payment is received.";
          break;

        case 'requires_payment_method':
          this.message = 'Payment failed. Please try another payment method.';
          break;

        default:
          this.message = 'Something went wrong.';
          break;
      }
    });
  }

}
