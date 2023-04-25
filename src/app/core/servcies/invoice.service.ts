import { Injectable } from '@angular/core';
import { API } from '../api';
import { Invoice } from '../interfaces/invoice';
import { HttpRequestService } from './http-request.service';


@Injectable()
export class InvoiceService {

  constructor(private http: HttpRequestService) { }

  getInvoiceList() {
    const body = {
      search: '',
      page_number: 0,
      page_size: 100
    }
    return this.http.post(API.invoice.list, body);
  }

  saveInvoice(data: Invoice) {
    const payload = {
      invoiceDTO: data
    }
    return this.http.post(API.invoice.save, payload);
  }

  saveAndPayInvoice(data: Invoice) {
    const payload = {
      invoiceDTO: data
    }
    console.log(payload)
    return this.http.post(API.invoice.saveAndPay, payload);
  }

}