import { Component, OnDestroy, OnInit } from '@angular/core';
import { Invoice } from '@app/core/interfaces/invoice';
import { Payment } from '@app/core/interfaces/payment';
import { InvoiceService } from '@app/core/servcies/invoice.service';
import { PaymentService } from '@app/core/servcies/payment.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


interface InvoiceList extends Invoice {
  invoiceId: string;
  created_date: string;
  updated_date: string;
  status: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  search: string = '';
  invoices: InvoiceList[] = [];
  private paymentSubscription!: Subscription;
  first: number = 0;
  rows: number = 10;
  totalRecords: number = 0;

  constructor(
    private invoiceService: InvoiceService,
    private messageService: MessageService,
    private paymentService: PaymentService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.invoiceList();
    this.checkPaymentCompletion();
  }

  invoiceList() {
    const body = {
      search: this.search || '',
      page_number: (this.first / this.rows) + 1,
      page_size: this.rows
    }
    this.invoiceService.getInvoiceList(body)
      .subscribe({
        next: (response: any) => {
          console.log(response)
          this.invoices = response['appointmentList'];
          this.totalRecords = response['total_count'];
        }
      });
  }

  searchInvoices() {
    this.search = this.search.trim();
    if (!!this.search) {
      this.first = 0;
      this.invoiceList();
    }
  }

  clearSearch() {
    this.first = 0;
    this.search = '';
    this.invoiceList();
  }

  payNow(invoice: InvoiceList) {
    if (invoice.status !== 'Pending') {
      return;
    }
    if (invoice.total <= 0) {
      this.messageService.add({ severity: 'warn', summary: 'Invalid Amount', detail: 'Amount must not be 0' });
      return;
    }
    this.paymentService.createOrder({ invoice_id: invoice.invoiceId, currency: invoice.currency })
      .subscribe({
        next: (response: any) => {
          const paymentData: Payment = {
            order_id: response.order_id,
            invoice_id: invoice.invoice_id,
            amount: invoice.total,
            name: `${invoice.applicant_first_name} ${invoice.applicant_last_name}`,
            contact: invoice.applicant_phone_number,
            email: invoice.applicant_email,
            gateway: invoice.processing_country === 'India' ? 'razorpay' : 'stripe'
          }
          this.paymentService.makePayment(paymentData);
        }
      });
  }

  checkPaymentCompletion() {
    this.paymentSubscription = this.paymentService.paymentStatus.subscribe(status => {
      if (status) {
        this.invoiceList();
      }
    });
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.invoiceList();
  }

  searchInput(event: any) {
    const searchText = event.target.value;
    if (!searchText) {
      this.first = 0;
      this.invoiceList();
    }
  }

  paymentAttempts(invoice: any) {
    console.log("paymentAttempts", invoice)
    this.router.navigate(['/dashboard/payment-attempts', invoice?.invoiceId]);
  }

  ngOnDestroy(): void {
    if (this.paymentSubscription) this.paymentSubscription.unsubscribe();
  }
}
