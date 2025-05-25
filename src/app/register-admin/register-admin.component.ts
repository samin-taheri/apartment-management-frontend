import { Component, OnInit } from '@angular/core';
import { ApartmentService } from '../services/apartment.service';
import { ToastService } from '../../toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-admin',
  standalone: false,
  templateUrl: './register-admin.component.html',
  styleUrl: './register-admin.component.css',
})
export class RegisterAdminComponent implements OnInit {
  admins: any[] = [];
  showForm = false;

  newAdmin = {
    username: '',
    password: '',
    email: '',
    phone: '',
    block: '',
    doorNumber: '',
    role: 'ADMIN' as 'ADMIN',
  };

  constructor(
    private service: ApartmentService,
    private toast: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('role') !== 'ADMIN') {
      this.router.navigate(['/unauthorized']);
    }
    this.loadAdmins();
  }

  loadAdmins() {
    this.service.getAdmins().subscribe({
      next: (res) => (this.admins = res),
      error: (err) => console.error('Failed to load admins', err),
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  submitAdmin(adminForm: any) {
    if (adminForm.invalid) {
      this.toast.showError('Please fill in all required fields correctly.');
      return;
    }

    const payload = { ...this.newAdmin, role: this.newAdmin.role };

    this.service.registerUser(payload).subscribe({
      next: (res: any) => {
        if (typeof res === 'string' && res?.toLowerCase().includes('success')) {
          this.toast.showSuccess(res);
        } else {
          this.toast.showSuccess('Admin registered!');
        }
        this.showForm = false;
        this.loadAdmins();
        this.resetForm();
      },
      error: (err) => {
        console.error('Admin registration failed', err);
        const message =
          err?.error || 'Failed to register admin. Please try again.';
        this.toast.showError(message);
      },
    });
  }

  resetForm() {
    this.newAdmin = {
      username: '',
      password: '',
      email: '',
      phone: '',
      block: '',
      doorNumber: '',
      role: 'ADMIN',
    };
  }

  deleteAdmin(id: number) {
    if (!confirm('Are you sure you want to delete this admin?')) return;

    this.service.deleteUser(id).subscribe({
      next: (res: string) => {
        this.toast.showSuccess(res);
        this.loadAdmins();
      },
      error: (err) => {
        const message = err?.error || 'Failed to delete admin.';
        this.toast.showError(message);
      },
    });
  }
}
