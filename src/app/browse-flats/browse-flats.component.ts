import { Component, Inject } from '@angular/core';
import { ApartmentService } from '../services/apartment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse-flats',
  standalone: false,
  templateUrl: './browse-flats.component.html',
  styleUrl: './browse-flats.component.css',
})
export class BrowseFlatsComponent {
  flats!: any;

  constructor(private service: ApartmentService, private router: Router) {
    service.getAllFlats().subscribe((response) => {
      this.flats = response;
      console.log(this.flats);
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('role') !== 'ADMIN') {
      this.router.navigate(['/unauthorized']);
    }
  }
}
