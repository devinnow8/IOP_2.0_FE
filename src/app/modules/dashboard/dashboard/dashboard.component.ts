import { Component } from '@angular/core';
import { Invoice } from '@app/core/interfaces/invoice';
import { InvoiceService } from '@app/core/servcies/invoice.service';

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
export class DashboardComponent {

  search: string = '';
  invoices: InvoiceList[] = [];

  constructor(private invoiceService: InvoiceService) {
    this.invoiceList();
  }

  invoiceList(search?: string) {
    this.invoiceService.getInvoiceList(search)
      .subscribe({
        next: (response: any) => {
          console.log(response)
          this.invoices = response['appointmentList'];
        }
      });
  }

  searchInvoices() {
    this.invoiceList(this.search);
  }

  clearSearch() {
    this.search = '';
    this.invoiceList();
  }

}
