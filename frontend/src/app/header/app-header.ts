import { Component } from '@angular/core';
import { NavbarComponent } from "./navbar/app-navbar";

@Component({
  selector: 'app-header',
  templateUrl: './app-header.html',
  imports: [NavbarComponent]
})
export class HeaderComponent {
}
