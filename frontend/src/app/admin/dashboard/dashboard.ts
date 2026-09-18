import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DestinazioniService } from '../../services/destinazioni';
import { AdminDestinazioniService } from '../../services/admin-destinazioni';
import { Destinazione } from '../../models/destinazione.model';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-admin-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class AdminDashboardComponent {

  private fb = inject(FormBuilder);
  private destinazioniService = inject(DestinazioniService);
  private adminService = inject(AdminDestinazioniService);

  destinazioni = signal<Destinazione[]>([]);
  richieste = signal<any[]>([]);
  tabAttiva = signal<'destinazioni' | 'richieste'>('destinazioni');

  modalitaModifica = signal(false);
  idInModifica = signal<number | null>(null);
  messaggioErrore = signal('');

  form = this.fb.nonNullable.group({
    titolo: ['', Validators.required],
    descrizione: ['', Validators.required],
    immagine: [''],
    prezzo: [0, [Validators.required, Validators.min(1)]]
  });

  ngOnInit(): void {
    this.caricaDestinazioni();
    this.caricaRichieste();
  }

  caricaDestinazioni(): void {
      this.destinazioniService.getDestinazioni().subscribe({
        next: (data) => this.destinazioni.set(data)
      });
  }

  caricaRichieste(): void {
    this.adminService.listaRichieste().subscribe({
      next: (data) => this.richieste.set(data)
    });
  }

  iniziaModifica(d: Destinazione): void {
    this.modalitaModifica.set(true);
    this.idInModifica.set(d.id);
    this.form.patchValue({
      titolo: d.titolo,
      descrizione: d.descrizione,
      immagine: d.immagine,
      prezzo: d.prezzo
    });
  }

  annullaModifica(): void {
    this.modalitaModifica.set(false);
    this.idInModifica.set(null);
    this.form.reset({ titolo: '', descrizione: '', immagine: '', prezzo: 0});
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.messaggioErrore.set('');
    const dati = this.form.value;

    const operazione = this.modalitaModifica()
      ? this.adminService.modifica(this.idInModifica()!, dati)
      : this.adminService.crea(dati);

    operazione.subscribe({
      next: () => {
        this.annullaModifica();
        this.caricaDestinazioni();
      },
      error: (err) => {
        this.messaggioErrore.set(err.error?.error || 'Errore durante il salvataggio')
      }
    });

  }

  elimina(id: number): void {
    if (!confirm('Sei sicuro di voler eliminare questa destinazione?')) return;

    this.adminService.elimina(id).subscribe({
      next: () => this.caricaDestinazioni(),
      error: (err) => this.messaggioErrore.set(err.error?.error || 'Errore durante l\'eliminazione')
    });
  }

}
