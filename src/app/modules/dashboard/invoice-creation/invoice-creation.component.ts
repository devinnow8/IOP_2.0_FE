import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Nationality } from '@app/core/interfaces/country';
import { Invoice, Merchant, ProcessingCentre, ProcessingCountry, Service } from '@app/core/interfaces/invoice';
import { Payment } from '@app/core/interfaces/payment';
import { InvoiceService } from '@app/core/servcies/invoice.service';
import { PaymentService } from '@app/core/servcies/payment.service';
import { Nationalities } from '@app/core/store/nationalities';
import { MessageService } from 'primeng/api';


type InvoiceControls = { [key in keyof Invoice]: FormControl<Invoice[key]> };

@Component({
  selector: 'app-invoice-creation',
  templateUrl: './invoice-creation.component.html',
  styleUrls: ['./invoice-creation.component.scss']
})
export class InvoiceCreationComponent implements OnInit {

  invoiceForm!: FormGroup<InvoiceControls>;
  merchants: Merchant[] = [];
  services: Service[] = [];
  countries: ProcessingCountry[] = [];
  processingCentres: ProcessingCentre[] = [];
  nationalities: Nationality[] = [];
  currency: string | undefined = '';

  constructor(
    private invoiceService: InvoiceService,
    private router: Router,
    private messageService: MessageService,
    private paymentService: PaymentService) {

    this.nationalities = Nationalities.sort((a, b) => (a.nationality < b.nationality ? -1 : 1));
  }

  ngOnInit() {
    this.initForm();
    this.fetchDropdowns();

    // const paymentData: Payment = {
    //   order_id: '',
    //   amount: 12,
    //   name: '',
    //   contact: '',
    //   email: ''
    // }
    // this.paymentService.payWithStripe(paymentData)
  }

  fetchDropdowns() {
    this.invoiceService.getDropdowns()
      .subscribe((response: any) => {
        this.merchants = response[0];
        this.countries = response[1];
      });
  }

  initForm() {
    this.invoiceForm = new FormGroup<InvoiceControls>({
      merchant: new FormControl('', { nonNullable: true }),
      merchant_service: new FormControl('', { nonNullable: true }),
      applicant_first_name: new FormControl('', { nonNullable: true }),
      applicant_last_name: new FormControl('', { nonNullable: true }),
      applicant_email: new FormControl('', { nonNullable: true, validators: Validators.email }),
      applicant_phone_number: new FormControl('', { nonNullable: true }),
      applicant_nationality: new FormControl('', { nonNullable: true }),
      processing_center: new FormControl('', { nonNullable: true }),
      processing_country: new FormControl('', { nonNullable: true }),
      service_fee: new FormControl(0, { nonNullable: true }),
      gateway_fee: new FormControl(0, { nonNullable: true }),
      total: new FormControl(0, { nonNullable: true }),
      mode_of_payment: new FormControl('', { nonNullable: true }),
      currency: new FormControl('', { nonNullable: true }),
      invoice_id: new FormControl('', { nonNullable: true })
    });
  }

  get form() {
    return this.invoiceForm.controls;
  }

  save(event: any) {
    if (this.invoiceForm.invalid) {
      return;
    }
    const formData = this.invoiceForm?.value as Invoice;
    if (formData.total <= 0) {
      this.messageService.add({ severity: 'warn', summary: 'Invalid Total', detail: 'Total must not be 0' });
      return;
    }
    if (event.submitter.id === 'saveAndPay') {
      this.invoiceService.saveAndPayInvoice(formData)
        .subscribe({
          next: (response: any) => {
            this.invoiceForm.patchValue({
              invoice_id: response.invoice_id
            });
            const paymentData: Payment = {
              order_id: response.order_id,
              invoice_id: response.invoice_id,
              gateway: response.gateway,
              amount: formData.total,
              name: `${formData.applicant_first_name} ${formData.applicant_last_name}`,
              contact: formData.applicant_phone_number,
              email: formData.applicant_email
            }
            this.paymentService.makePayment(paymentData);
          }
        });
    } else {
      this.invoiceService.saveInvoice(formData)
        .subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Invoice Created' });
            this.router.navigate(['/dashboard']);
          }
        });
    }
  }

  changeMerchant(event: any) {
    this.services = this.merchants.find((merchant: Merchant) => merchant.merchant === event.value)?.services!;
  }

  changeCountry(event: any) {
    this.processingCentres = this.countries.find((country: ProcessingCountry) => country.name === event.value)?.centers!;
    this.currency = event.value == 'India' ? 'INR' : 'USD';
    this.invoiceForm.patchValue({
      currency: this.currency
    });
  }

  serviceFeeChange(event: any) {
    const serviceFee = parseFloat(event.target.value);
    this.invoiceForm.patchValue({
      total: serviceFee + this.invoiceForm.value.gateway_fee!
    });
  }

  gatewayFeeChange(event: any) {
    const gatewayFee = parseFloat(event.target.value);
    this.invoiceForm.patchValue({
      total: gatewayFee + this.invoiceForm.value.service_fee!
    });
  }
}
