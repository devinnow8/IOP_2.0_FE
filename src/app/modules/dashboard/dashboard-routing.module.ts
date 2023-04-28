import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InvoiceCreationComponent } from './invoice-creation/invoice-creation.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { 
        path: '',
        component: DashboardComponent
      },
      {
        path: 'create-invoice',
        component: InvoiceCreationComponent
      },
      {
        path: 'payment-status',
        component: PaymentSuccessComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

