import { Component, OnInit } from '@angular/core';
import { ApartmentService, Flat } from '../services/apartment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../toast.service';

@Component({
  selector: 'app-flat-detail',
  standalone: false,
  templateUrl: './flat-detail.component.html',
  styleUrl: './flat-detail.component.css',
})
export class FlatDetailComponent implements OnInit {
  flat?: any;
  googleMapUrl: string = '';
  isLoading = true;
  notFound = false;

  constructor(
    private route: ActivatedRoute,
    private service: ApartmentService,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('role') !== 'ADMIN') {
      this.router.navigate(['/unauthorized']);
    }
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getFlatById(id).subscribe({
      next: (flat) => {
        if (!flat) {
          this.notFound = true;
        } else {
          if (typeof flat.facilities === 'string') {
            flat.facilities = flat.facilities.split(',');
          }
          this.flat = flat;
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading flat:', err);
        this.notFound = true;
        this.isLoading = false;
      },
    });
  }

  showEditModal = false;

  editFlat(): void {
    this.showEditModal = true;
  }

  onSave(updated: Flat) {
    // Safety: convert facilities back to string if needed
    const safeFlat: Flat = {
      ...updated,
      facilities: Array.isArray(updated.facilities)
        ? updated.facilities.join(',')
        : updated.facilities,
    };

    this.service.updateFlat(safeFlat.id!, safeFlat).subscribe((response) => {
      // Convert facilities back to array again for rendering
      if (typeof response.facilities === 'string') {
        response.facilities = response.facilities.split(',');
      }

      this.flat = response;
      this.showEditModal = false;
    });
  }

  onCloseModal() {
    this.showEditModal = false;
  }
  goBack(): void {
    this.router.navigate(['/browse']);
  }

  deleteFlat(): void {
    if (this.flat && this.flat.id != null) {
      if (confirm('Are you sure you want to delete this flat?')) {
        this.service.deleteFlat(this.flat.id).subscribe((response) => {
          this.toast.showSuccess(response);
          this.goBack();
        });
      }
    }
  }
}
