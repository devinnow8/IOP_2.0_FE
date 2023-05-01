import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentAttemptsTS } from '@app/core/interfaces/payment';
import { Invoice, } from '@app/core/interfaces/invoice';
import { InvoiceService } from '@app/core/servcies/invoice.service';
import { PaymentService } from '@app/core/servcies/payment.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-invoice-creation',
  templateUrl: './payment-attempts.component.html',
  styleUrls: ['./payment-attempts.component.scss']
})
export class PaymentAttempts implements OnInit {


  paymentAttemptsData: PaymentAttemptsTS[] = [];


  constructor(
    private router: Router,
    private route: ActivatedRoute

  ) {
    this.paymentAttemptsData = [
      {
        order_id: "123",
        payment_gateway: "random",
        service_amount: "random",
        gateway_fees: "random",
        status: "random",
        date_time: "random",
      },

      {
        order_id: "456",
        payment_gateway: "random",
        service_amount: "random",
        gateway_fees: "random",
        status: "random",
        date_time: "random",
      },
      {
        order_id: "789",
        payment_gateway: "random",
        service_amount: "random",
        gateway_fees: "random",
        status: "random",
        date_time: "random",
      },
      {
        order_id: "987",
        payment_gateway: "random",
        service_amount: "random",
        gateway_fees: "random",
        status: "random",
        date_time: "random",
      },
    ]
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log("id", id)
  }

}
