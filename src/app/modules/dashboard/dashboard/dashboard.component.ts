import { Component } from '@angular/core';
import { InvoiceService } from '@app/core/servcies/invoice.service';

interface Invoice {
  id: number;
  merchant: string;
  name: string;
  national: string;
  amount: number;
  status: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  search: string = '';
  invoices: Invoice[] = [];

  constructor(private invoiceService: InvoiceService) {
    this.invoices = [
      { id: 1, merchant: '1234', name: 'John', national: 'USA', amount: 3424, status: 'Paid' },
      { id: 2, merchant: '3454', name: 'Albert', national: 'USA', amount: 5656, status: 'Unpaid' }
    ]

    // this.invoiceList();
  }

  invoiceList(search?: string) {
    this.invoiceService.getInvoiceList(search)
      .subscribe({
        next: (response) => {
          console.log(response)
        }
      });
  }

  searchInvoices() {
    console.log(this.search)
    // this.invoiceList(this.search);
  }

  clearSearch() {
    this.search = '';
    // this.invoiceList();
  }

}
