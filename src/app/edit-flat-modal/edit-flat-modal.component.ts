import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Flat } from '../services/apartment.service';

@Component({
  selector: 'app-edit-flat-modal',
  standalone: false,
  templateUrl: './edit-flat-modal.component.html',
  styleUrl: './edit-flat-modal.component.css',
})
export class EditFlatModalComponent {
  @Input() flat!: Flat;
  @Output() save = new EventEmitter<Flat>();
  @Output() close = new EventEmitter<void>();

  updatedFlat: Flat = { ...this.flat };

  ngOnChanges() {
    this.updatedFlat = { ...this.flat };
  }

  submit() {
    this.save.emit(this.updatedFlat);
  }

  cancel() {
    this.close.emit();
  }
}
