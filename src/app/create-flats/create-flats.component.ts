import { Component } from '@angular/core';
import { ApartmentService, Flat } from '../services/apartment.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../toast.service';

@Component({
  selector: 'app-create-flats',
  standalone: false,
  templateUrl: './create-flats.component.html',
  styleUrl: './create-flats.component.css',
})
export class CreateFlatsComponent {
  flat = {
    name: '',
    type: '',
    furnished: false,
    facilities: [],
    address: {
      street: '',
      city: '',
    },
  };

  facilityOptions = ['WiFi', 'Gym', 'Pool', 'Parking'];
  flatTypes = ['Studio', '1BHK', '2BHK'];

  constructor(
    private service: ApartmentService,
    private router: Router,
    private toast: ToastService
  ) {}

  submitForm(form: NgForm) {
    if (form.valid) {
      const flatToSend = {
        name: this.flat.name,
        type: this.flat.type,
        furnished: this.flat.furnished,
        facilities: this.flat.facilities.join(','),
        street: this.flat.address.street,
        city: this.flat.address.city,
      };

      this.service.createFlat(flatToSend).subscribe(() => {
        this.toast.showSuccess('Flat created successfully!');
        this.router.navigate(['/browse']);
      });
    }
  }
}
