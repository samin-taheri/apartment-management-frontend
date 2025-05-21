import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApartmentService } from '../services/apartment.service';
import { ToastService } from '../../toast.service';

@Component({
  selector: 'app-add-payment',
  standalone: false,
  templateUrl: './add-payment.component.html',
  styleUrl: './add-payment.component.css',
})
export class AddPaymentComponent implements OnInit {
  form: FormGroup;
  flats: any[] = [];

  constructor(
    private fb: FormBuilder,
    private service: ApartmentService,
    private toast: ToastService
  ) {
    this.form = this.fb.group({
      flatId: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      due_date: [new Date().toISOString().split('T')[0], Validators.required],
    });
  }

  ngOnInit(): void {
    this.service.getAllFlats().subscribe({
      next: (res) => {
        this.flats = res;
        if (this.flats.length > 0) {
          this.form.patchValue({ flatId: this.flats[0].id });
        }
      },
      error: (err) => console.error('Failed to load flats', err),
    });
  }

  submit() {
    if (this.form.valid) {
      const payload = {
        ...this.form.value,
        dueDate: this.form.value.due_date,
      };
      this.service.createPayment(payload).subscribe(() => {
        this.toast.showSuccess('Payment created!');
        this.form.reset();
      });
    }
  }
}
