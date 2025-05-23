import { Component } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-user-dashboard',
  standalone: false,
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
})
export class UserDashboardComponent {
  constructor(public app: AppComponent) {}
}
