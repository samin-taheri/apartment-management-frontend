import { Component, OnInit } from '@angular/core';
import { ApartmentService } from '../../services/apartment.service';

@Component({
  selector: 'app-view-announcements',
  standalone: false,
  templateUrl: './view-announcements.component.html',
  styleUrl: './view-announcements.component.css',
})
export class ViewAnnouncementsComponent implements OnInit {
  announcements: any[] = [];

  constructor(private announcementService: ApartmentService) {}

  ngOnInit(): void {
    this.announcementService.getAnnouncements().subscribe({
      next: (data) => (this.announcements = data),
      error: (err) => console.error('Error fetching announcements:', err),
    });
  }
}
