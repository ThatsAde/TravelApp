import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { DestinazioniService } from '../../services/destinazioni';
import { Destinazione } from '../../models/destinazione.model';

@Component({
  imports: [CommonModule],
  selector: 'app-destinazioni',
  styleUrl: './destinazioni.scss',
  templateUrl: './destinazioni.html',
})
export class Destinazioni implements OnInit {

  destinazioni = signal<Destinazione[]>([]);
  loading = signal(true);
  error = signal(false);
  currentIndex = signal(0);

  constructor(private destinazioniService: DestinazioniService) {}

  ngOnInit(): void {
    this.destinazioniService.getDestinazioni().subscribe({
      next: (data) => {
        this.destinazioni.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      }
    });
  }

  next(): void {
    if (this.currentIndex() < this.destinazioni().length - 1) {
      this.currentIndex.update(i => i + 1);
    }
  }

  prev(): void {
    if (this.currentIndex() > 0) {
      this.currentIndex.update(i => i - 1);
    }
  }
}