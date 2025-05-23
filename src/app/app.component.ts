import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ApartmentService } from './services/apartment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  showHeader: boolean = true;
  userProfile: any = {};
  profileVisible = false;

  constructor(private router: Router, private userService: ApartmentService) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (event.url === '/login') {
          this.showHeader = false;
        } else {
          this.showHeader = true;
        }
      });
  }

  ngOnInit(): void {
    const username = localStorage.getItem('username');
    if (username) {
      this.userService.getUserByUsername(username).subscribe({
        next: (user) => {
          this.userProfile = user;
        },
        error: (err) => {
          console.error('Failed to fetch user profile:', err);
        },
      });
    }
  }

  get userRole(): string | null {
    return localStorage.getItem('role');
  }

  get isAdmin(): boolean {
    return this.userRole === 'ADMIN';
  }

  get isUser(): boolean {
    return this.userRole === 'USER';
  }

  get username(): string | null {
    return localStorage.getItem('username');
  }

  toggleProfile() {
    this.profileVisible = !this.profileVisible;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const clickedInsideProfile = target.closest(
      '.profile-button, .profile-popup'
    );
    if (!clickedInsideProfile) {
      this.profileVisible = false;
    }
  }

  logout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
