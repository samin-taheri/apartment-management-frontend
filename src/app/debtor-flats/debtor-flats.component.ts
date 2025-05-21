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
}
