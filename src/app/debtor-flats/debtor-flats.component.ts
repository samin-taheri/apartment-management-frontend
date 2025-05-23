import { Component, OnInit } from '@angular/core';
import { ApartmentService, Flat } from '../services/apartment.service';

@Component({
  selector: 'app-debtor-flats',
  standalone: false,
  templateUrl: './debtor-flats.component.html',
  styleUrl: './debtor-flats.component.css',
})
export class DebtorFlatsComponent implements OnInit {
  debtorFlats: Flat[] = [];
  paymentFilter: 'all' | 'paid' | 'unpaid' = 'all';

  constructor(private service: ApartmentService) {}

  ngOnInit(): void {
    this.service.getDebtorFlats().subscribe((flats) => {
      this.debtorFlats = flats;
    });
  }

  accept(paymentId: number) {
    this.service.acceptPayment(paymentId).subscribe(() => {
      // Reload or update the state after accepting payment
      this.ngOnInit();
    });
  }

  shouldShowPayment(payment: any): boolean {
    return (
      this.paymentFilter === 'all' ||
      (this.paymentFilter === 'paid' && payment.paid === true) ||
      (this.paymentFilter === 'unpaid' && payment.paid === false)
    );
  }

  shouldShowFlat(flat: Flat): boolean {
    return (
      flat.payments?.some((payment) => this.shouldShowPayment(payment)) ?? false
    );
  }
}
