import { Component } from '@angular/core';
import { ScrollytellingComponent } from './scrollytelling/scrollytelling';
import { Preventivo } from '../preventivo/preventivo';
import { Destinazioni } from './destinazioni/destinazioni';

@Component({
  selector: 'app-home',
  imports: [ScrollytellingComponent, Preventivo, Destinazioni],
  templateUrl: './home.html',
})
export class HomeComponent {}
