import { Injectable } from '@angular/core';
import { API } from '../api';
import { Invoice } from '../interfaces/invoice';
import { HttpRequestService } from './http-request.service';


@Injectable()
export class InvoiceService {

  constructor(private http: HttpRequestService) { }

  getInvoiceList(search?: string) {
    const body = {
      search: search || '',
      page_number: 0,
      page_size: 100
    }
    return this.http.post(API.invoice.list, body);
  }

  saveInvoice(payload: Invoice) {
    return this.http.post(API.invoice.save, payload);
  }

  saveAndPayInvoice(payload: Invoice) {
    return this.http.post(API.invoice.saveAndPay, payload);
  }

}