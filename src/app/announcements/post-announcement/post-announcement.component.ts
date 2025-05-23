import { Component } from '@angular/core';
import { ApartmentService } from '../../services/apartment.service';
import { ToastService } from '../../../toast.service';

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
    private toastr: ToastService
  ) {}

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
