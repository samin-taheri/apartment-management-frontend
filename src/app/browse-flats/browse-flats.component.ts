import { Component, Inject } from '@angular/core';
import { ApartmentService } from '../services/apartment.service';

@Component({
  selector: 'app-browse-flats',
  standalone: false,
  templateUrl: './browse-flats.component.html',
  styleUrl: './browse-flats.component.css'
})

export class BrowseFlatsComponent {

  flats !: any;

  constructor(private service: ApartmentService) {
    service.getAllFlats().subscribe( response => {
      this.flats = response;
      console.log(this.flats);
    });
  }

}
