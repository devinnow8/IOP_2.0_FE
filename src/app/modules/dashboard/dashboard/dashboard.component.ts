import { Component, OnDestroy, OnInit } from '@angular/core';
import { Invoice } from '@app/core/interfaces/invoice';
import { RazorpayPayment } from '@app/core/interfaces/payment';
import { InvoiceService } from '@app/core/servcies/invoice.service';
import { PaymentService } from '@app/core/servcies/payment.service';
import { Subscription } from 'rxjs';

interface InvoiceList extends Invoice {
  invoiceId: string;
  created_date: string;
  updated_date: string;
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
    private paymentService: PaymentService) { }

  ngOnInit() {
    this.invoiceList();
    this.checkPaymentCompletion();
  }

  invoiceList() {
    const body = {
      search: this.search || '',
      page_number: (this.first/this.rows) + 1,
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
    if (!!this.search)
      this.invoiceList();
  }

  clearSearch() {
    this.search = '';
    this.invoiceList();
  }

  payNow(invoice: InvoiceList) {
    this.paymentService.createOrder({ invoice_id: invoice.invoiceId })
      .subscribe({
        next: (response: any) => {
          const paymentData: RazorpayPayment = {
            order_id: response.order_id,
            amount: invoice.total,
            name: `${invoice.applicant_first_name} ${invoice.applicant_last_name}`,
            contact: invoice.applicant_phone_number,
            email: invoice.applicant_email
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

  ngOnDestroy(): void {
    if (this.paymentSubscription) this.paymentSubscription.unsubscribe();
  }
}
