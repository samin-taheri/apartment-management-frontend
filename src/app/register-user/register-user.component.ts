import { Component, OnInit } from '@angular/core';
import { ApartmentService } from '../services/apartment.service';
import { ToastService } from '../../toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  standalone: false,
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css',
})
export class RegisterUserComponent implements OnInit {
  users: any[] = [];
  showForm = false;

  newUser = {
    username: '',
    password: '',
    email: '',
    phone: '',
    block: '',
    doorNumber: '',
    role: 'USER',
  };

  constructor(
    private service: ApartmentService,
    private toast: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    if (localStorage.getItem('role') !== 'ADMIN') {
      this.router.navigate(['/unauthorized']);
    }
    this.loadUsers();
  }

  loadUsers() {
    this.service.getRegularUsers().subscribe({
      next: (data) => (this.users = data),
      error: (err) => console.error('Failed to load users', err),
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  submitUser(userForm: any) {
    if (userForm.invalid) {
      this.toast.showError('Please fill in all required fields.');
      return;
    }

    const payload = {
      ...this.newUser,
      role: this.newUser.role as 'ADMIN' | 'USER',
    };

    this.service.registerUser(payload).subscribe({
      next: (res: any) => {
        this.toast.showSuccess(res);
        this.showForm = false;
        this.loadUsers();
        this.resetForm();
      },
      error: (err) => {
        console.error('User registration failed', err);
        const message =
          err?.error || 'User registration failed. Please try again.';
        this.toast.showError(message);
      },
    });
  }

  resetForm() {
    this.newUser = {
      username: '',
      password: '',
      email: '',
      phone: '',
      block: '',
      doorNumber: '',
      role: 'USER',
    };
  }

  deleteUser(id: number) {
    if (!confirm('Are you sure you want to delete this user?')) return;

    this.service.deleteUser(id).subscribe({
      next: (res: string) => {
        this.toast.showSuccess(res);
        this.loadUsers();
      },
      error: (err) => {
        console.error('User deletion failed', err);
        const message =
          err?.error || 'Failed to delete user. Please try again.';
        this.toast.showError(message);
      },
    });
  }
}
