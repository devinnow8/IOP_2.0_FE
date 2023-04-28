import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { PaymentService } from '@app/core/servcies/payment.service';
import { environment } from '@env/environment';
import { MessageService } from 'primeng/api';

function _window(): any {
  return window;
}

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit {

  message: string = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private paymentService: PaymentService,
    private messageService: MessageService
  ) {

  }

  ngOnInit(): void {
    this.paymentStatus();
  }

  get nativeWindow(): any {
    if (isPlatformBrowser(this.platformId)) {
      return _window();
    }
  }

  paymentStatus() {
    const stripe = this.nativeWindow.Stripe(environment.STRIPE_PK);
    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) return;

    const intent: any = new URLSearchParams(window.location.search).get(
      'payment_intent'
    );
    console.log(intent)

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
