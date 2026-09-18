import { Component, signal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from "@angular/router";
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive ],
  styleUrl: './app-navbar.css',
  templateUrl: './app-navbar.html',
})
export class NavbarComponent {

  protected readonly isOpen = signal(false);
  protected authService = inject(AuthService); // protected: accessibile dal template
  private router = inject(Router);

  toggleMenu() {
    this.isOpen.update((open) => !open);
  }

  closeMenu() {
    this.isOpen.set(false);
  }

  logout() {
    this.authService.logout();
    this.closeMenu();
    this.router.navigate(['/']);
  }

}
