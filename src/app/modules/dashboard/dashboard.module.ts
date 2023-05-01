import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PaginatorModule } from 'primeng/paginator';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutComponent } from './shared/layout/layout.component';
import { HeaderComponent } from './shared/header/header.component';
import { InvoiceCreationComponent } from './invoice-creation/invoice-creation.component';
import { InvoiceService } from '@app/core/servcies/invoice.service';
import { PaymentService } from '@app/core/servcies/payment.service';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { PaymentComponent } from './shared/payment/payment.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import {PaymentAttempts} from './payment-attempts/payment-attempts.component'

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    LayoutComponent,
    InvoiceCreationComponent,
    PaymentComponent,
    PaymentSuccessComponent,
    PaymentAttempts
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    PanelModule,
    DropdownModule,
    RadioButtonModule,
    PaginatorModule,
    DynamicDialogModule
  ],
  providers: [
    InvoiceService,
    DialogService,
    PaymentService
  ]
})
export class DashboardModule { }
