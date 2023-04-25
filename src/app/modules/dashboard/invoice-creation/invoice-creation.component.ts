import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Invoice } from '@app/core/interfaces/invoice';
import { InvoiceService } from '@app/core/servcies/invoice.service';
import { MessageService } from 'primeng/api';

interface Dropdown {
  name: string;
  value: string;
}

type InvoiceControls = { [key in keyof Invoice]: FormControl<Invoice[key]> };

@Component({
  selector: 'app-invoice-creation',
  templateUrl: './invoice-creation.component.html',
  styleUrls: ['./invoice-creation.component.scss'],
  providers: [MessageService]
})
export class InvoiceCreationComponent {

  invoiceForm!: FormGroup<InvoiceControls>;
  merchant: Dropdown[] = [];
  services: Dropdown[] = [];
  countries: Dropdown[] = [];
  processingCentres: Dropdown[] = [];

  constructor(
    private invoiceService: InvoiceService,
    private messageService: MessageService) {
    this.initForm();

    this.merchant = [
      { name: 'NIS', value: 'NIS' },
      { name: 'FRSC', value: 'FRSC' }
    ];

    this.countries = [
      { name: 'India', value: 'India' },
      { name: 'USA', value: 'USA' },
      { name: 'UK', value: 'UK' }
    ];
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
      service_fee: new FormControl('', { nonNullable: true }),
      gateway_fee: new FormControl('', { nonNullable: true }),
      total: new FormControl('', { nonNullable: true }),
      mode_of_payment: new FormControl('', { nonNullable: true })
    });
  }

  get form() {
    return this.invoiceForm.controls;
  }

  save(event: any) {
    if (this.invoiceForm.invalid) {
      return;
    }

    console.log(event.submitter.id)
    console.log(this.invoiceForm?.value);
    const formData = this.invoiceForm?.value as Invoice;
    if (event.submitter.id === 'saveAndPay') {
      this.invoiceService.saveAndPayInvoice(formData)
        .subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Invoice Created' });
          }
        });
    } else {
      this.invoiceService.saveInvoice(formData)
        .subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Invoice Created' });
          }
        });
    }
  }

  changeMerchant(event: any) {
    console.log(event.value.value)
    if (event.value.value === 'NIS') {
      this.services = [
        { name: 'Passport', value: 'passport' },
        { name: 'Visa', value: 'visa' },
        { name: 'VOA', value: 'voa' }
      ];
    } else {
      this.services = [
        { name: '3 Year DL', value: 'dl_3' },
        { name: '5 Year DL', value: 'dl_5' }
      ];
    }
  }

  changeCountry(event: any) {
    switch (event.value.value) {
      case 'India':
        this.processingCentres = [
          { name: 'New Delhi', value: 'New Delhi' },
          { name: 'Mumbai', value: 'Mumbai' },
          { name: 'Kokata', value: 'Kolkata' },
          { name: 'Bengaluru', value: 'Bengaluru' }
        ];
        break;
      case 'USA':
        this.processingCentres = [
          { name: 'New York', value: 'New York' },
          { name: 'Chicago', value: 'Chicago' },
          { name: 'Boston', value: 'Boston' },
          { name: 'Austin', value: 'Austin' }
        ];
        break;
      case 'UK':
        this.processingCentres = [
          { name: 'London', value: 'London' },
          { name: 'Liverpool', value: 'Liverpool' },
          { name: 'Manchester', value: 'Manchester' },
          { name: 'Birmingham', value: 'Birmingham' }
        ];
        break;
    }
  }

}
