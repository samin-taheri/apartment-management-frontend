import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApartmentService } from '../services/apartment.service';
import { ToastService } from '../../toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-payment',
  standalone: false,
  templateUrl: './add-payment.component.html',
  styleUrl: './add-payment.component.css',
})
export class AddPaymentComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  flats: any[] = [];

  constructor(
    private fb: FormBuilder,
    private service: ApartmentService,
    private toast: ToastService,
    private router: Router
  ) {
    this.form = this.fb.group({
      flatId: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      due_date: [new Date().toISOString().split('T')[0], Validators.required],
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('role') !== 'ADMIN') {
      this.router.navigate(['/unauthorized']);
    }
    this.service.getAllFlats().subscribe({
      next: (res) => {
        this.flats = res;
      },
      error: (err) => console.error('Failed to load flats', err),
    });
  }

  submit(): void {
    this.submitted = true;

    if (this.form.invalid) return;

    const payload = {
      ...this.form.value,
      dueDate: this.form.value.due_date,
    };

    this.service.createPayment(payload).subscribe(() => {
      this.toast.showSuccess('Payment created!');
      this.submitted = false;
      this.form.reset({
        flatId: this.flats.length > 0 ? this.flats[0].id : '',
        amount: 0,
        due_date: new Date().toISOString().split('T')[0],
      });
    });
  }
}
