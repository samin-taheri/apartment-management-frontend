import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowseFlatsComponent } from './browse-flats/browse-flats.component';
import { CreateFlatsComponent } from './create-flats/create-flats.component';
import { FlatDetailComponent } from './flat-detail/flat-detail.component';
import { LoginComponent } from './login/login.component';
import { DebtorFlatsComponent } from './debtor-flats/debtor-flats.component';
import { ExpenseRecordComponent } from './expense-record/expense-record.component';
import { SummaryComponent } from './summary/summary.component';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'debtor', component: DebtorFlatsComponent },
  { path: 'browse', component: BrowseFlatsComponent },
  { path: 'create', component: CreateFlatsComponent },
  { path: 'viewFlat/:id', component: FlatDetailComponent },
  { path: 'debtors', component: DebtorFlatsComponent },
  { path: 'expenses', component: ExpenseRecordComponent },
  { path: 'summary', component: SummaryComponent },
  { path: 'add-payment', component: AddPaymentComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
