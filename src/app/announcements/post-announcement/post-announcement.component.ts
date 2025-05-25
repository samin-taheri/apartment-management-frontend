import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApartmentService } from '../../services/apartment.service';
import { ToastService } from '../../../toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-announcement',
  standalone: false,
  templateUrl: './post-announcement.component.html',
  styleUrl: './post-announcement.component.css',
})
export class PostAnnouncementComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private announcementService: ApartmentService,
    private toastr: ToastService,
    private router: Router
  ) {
    this.form = this.fb.group({
      message: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('role') !== 'ADMIN') {
      this.router.navigate(['/unauthorized']);
    }
  }

  post(): void {
    this.submitted = true;

    if (this.form.invalid) return;

    const message = this.form.value.message.trim();

    this.announcementService.postAnnouncement(message).subscribe({
      next: () => {
        this.toastr.showSuccess('Announcement posted successfully!');
        this.form.reset();
        this.submitted = false;
      },
      error: () => this.toastr.showError('Failed to post announcement'),
    });
  }
}
