import { Component } from '@angular/core';
import { ApartmentService } from '../../services/apartment.service';
import { ToastService } from '../../../toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-announcement',
  standalone: false,
  templateUrl: './post-announcement.component.html',
  styleUrl: './post-announcement.component.css',
})
export class PostAnnouncementComponent {
  message: string = '';

  constructor(
    private announcementService: ApartmentService,
    private toastr: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('role') !== 'ADMIN') {
      this.router.navigate(['/unauthorized']);
    }
  }

  post(): void {
    if (!this.message.trim()) {
      this.toastr.showError('Announcement cannot be empty.');
      return;
    }

    this.announcementService.postAnnouncement(this.message).subscribe({
      next: () => {
        this.toastr.showSuccess('Announcement posted successfully!');
        this.message = '';
      },
      error: () => this.toastr.showSuccess('Failed to post announcement'),
    });
  }
}
