import { Injectable } from '@angular/core';
import { API } from '../api';
import { Invoice } from '../interfaces/invoice';
import { List } from '../interfaces/list';
import { HttpRequestService } from './http-request.service';


@Injectable()
export class InvoiceService {

  constructor(private http: HttpRequestService) { }

  getInvoiceList(body: List) {
    return this.http.post(API.invoice.list, body);
  }

  saveInvoice(payload: Invoice) {
    return this.http.post(API.invoice.save, payload);
  }

  saveAndPayInvoice(payload: Invoice) {
    return this.http.post(API.invoice.saveAndPay, payload);
  }

}