import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  services: Dropdown[] = [];

  constructor(
    private invoiceService: InvoiceService,
    private messageService: MessageService) {
    this.initForm();

    this.services = [
      { name: 'NIS', value: 'NIS' },
      { name: 'FRSC', value: 'FRSC' }
    ];
  }

  initForm() {
    this.invoiceForm = new FormGroup<InvoiceControls>({
      merchant: new FormControl('', { nonNullable: true }),
      merchant_service: new FormControl('', { nonNullable: true }),
      applicant_first_name: new FormControl('', { nonNullable: true }),
      applicant_last_name: new FormControl('', { nonNullable: true }),
      applicant_email: new FormControl('', { nonNullable: true }),
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

  save(event: any) {
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

}
