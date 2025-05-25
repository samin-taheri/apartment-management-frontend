import { Component, OnInit } from '@angular/core';
import { ApartmentService } from '../services/apartment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-payments',
  standalone: false,
  templateUrl: './user-payments.component.html',
  styleUrl: './user-payments.component.css',
})
export class UserPaymentsComponent implements OnInit {
  payments: any[] = [];
  username: string | null = '';

  constructor(private service: ApartmentService) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    if (this.username) {
      this.service.getPaymentsByUsername(this.username).subscribe({
        next: (data) => {
          this.payments = data;
        },
        error: (err) => {
          console.error('Failed to load payments', err);
        },
      });
    }
  }
}
