import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
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

  getMerchantList() {
    return this.http.get(API.merchant.list);
  }

  getPaymentAttemptList(body: string) {
    return this.http.get(API.merchant.paymentAttempts(body));
  }

  getCentreList() {
    return this.http.get(API.centre.list);
  }

  getDropdowns() {
    return forkJoin([
      this.getMerchantList(),
      this.getCentreList()
    ]);
  }

}