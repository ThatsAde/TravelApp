import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RichiesteService } from '../services/richieste';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  selector: 'app-preventivo',
  styleUrl: './preventivo.css',
  templateUrl: './preventivo.html',
})
export class Preventivo {

  private fb = inject(FormBuilder);
  private richiesteService = inject(RichiesteService);

  inviato = false;
  errore = false;
  invioInCorso = false;

  form = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    meta: ['', [Validators.required]],
    budget: ['', [Validators.required, Validators.minLength(1)]],
    messaggio: ['']
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.invioInCorso = true;

    this.richiesteService.inviaRichiesta(this.form.value).subscribe({
      next: () => {
        this.inviato = true;
        this.invioInCorso = false;
        this.form.reset();
      },
      error: () => {
        this.errore = true;
        this.invioInCorso = false;
      }
    });

  }

}
