import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApartmentService } from '../services/apartment.service';
import { ToastService } from '../../toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-record',
  standalone: false,
  templateUrl: './expense-record.component.html',
  styleUrl: './expense-record.component.css',
})
export class ExpenseRecordComponent {
  expenseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: ApartmentService,
    private toast: ToastService,
    private router: Router
  ) {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

    this.expenseForm = this.fb.group({
      category: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      note: [''],
      date: [today, Validators.required],
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('role') !== 'ADMIN') {
      this.router.navigate(['/unauthorized']);
    }
  }

  onSubmit() {
    if (this.expenseForm.valid) {
      this.service.createExpense(this.expenseForm.value).subscribe(() => {
        this.toast.showSuccess('Expense recorded!');
        this.expenseForm.reset();
      });
    }
  }
}
