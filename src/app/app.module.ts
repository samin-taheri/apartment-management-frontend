import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ApartmentService } from './services/apartment.service';
import { BrowseFlatsComponent } from './browse-flats/browse-flats.component';
import { CreateFlatsComponent } from './create-flats/create-flats.component';
import { FlatDetailComponent } from './flat-detail/flat-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { TokenInterceptor } from '../token.interceptor';
import { EditFlatModalComponent } from './edit-flat-modal/edit-flat-modal.component';
import { DebtorFlatsComponent } from './debtor-flats/debtor-flats.component';
import { ExpenseRecordComponent } from './expense-record/expense-record.component';
import { NgChartsModule } from 'ng2-charts';
import { SummaryComponent } from './summary/summary.component';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    BrowseFlatsComponent,
    CreateFlatsComponent,
    FlatDetailComponent,
    LoginComponent,
    EditFlatModalComponent,
    DebtorFlatsComponent,
    ExpenseRecordComponent,
    SummaryComponent,
    AddPaymentComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule,
    MatSnackBarModule,
  ],
  providers: [
    ApartmentService,
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
