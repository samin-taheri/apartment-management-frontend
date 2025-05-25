import { Component } from '@angular/core';
import { ToastService } from '../../toast.service';

@Component({
  selector: 'app-unauthorized',
  standalone: false,
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.css',
})
export class UnauthorizedComponent {
  constructor(private toast: ToastService) {}

  ngOnInit(): void {
    this.toast.showError('you are unauthorized!');
  }
}
