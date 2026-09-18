import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './header/app-header';
import { ScrollytellingComponent } from './home/scrollytelling/scrollytelling';
import { Destinazioni } from './home/destinazioni/destinazioni';
import { Preventivo } from './preventivo/preventivo';

@Component({
  imports: [HeaderComponent, RouterOutlet, ScrollytellingComponent, Destinazioni, Preventivo],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
}
