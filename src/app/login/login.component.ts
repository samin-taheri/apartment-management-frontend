import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApartmentService } from '../services/apartment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string = '';

  selectedRole: string | null = null;

  toggleRole(role: string) {
    if (this.selectedRole === role) {
      this.selectedRole = null;
    } else {
      this.selectedRole = role;
    }
  }
  constructor(
    private fb: FormBuilder,
    private apartmentService: ApartmentService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: [''],
      password: [''],
      role: [''],
    });
  }
  onSubmit() {
    const { username, password } = this.loginForm.value;

    if (!this.selectedRole) {
      this.loginError = 'Please select a role.';
      return;
    }

    this.apartmentService.login(username, password).subscribe({
      next: (res) => {
        if (res.role !== this.selectedRole) {
          this.loginError =
            'Incorrect role selected. Please choose the correct role.';
          return;
        }

        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
        localStorage.setItem('username', username);
        if (res.role === 'ADMIN') {
          this.router.navigate(['/dashboard']).then(() => {
            location.reload();
          });
        } else if (res.role === 'USER') {
          this.router.navigate(['/user-dashboard']).then(() => {
            location.reload();
          });
        }
      },
      error: (err) => {
        this.loginError = err.error?.message || 'Login failed.';
      },
    });
  }
}
