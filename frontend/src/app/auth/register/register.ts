import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  standalone: true,
  selector: 'app-register',
  styleUrl: './register.scss',
  templateUrl: './register.html',
})
export class RegisterComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService)
  private router = inject(Router);

  errore = '';
  invioInCorso = false;

  form = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.invioInCorso = true;
    this.errore = '';

    const { nome, email, password } = this.form.value;

    this.authService.register(nome!, email!, password!).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errore = err.error?.error || "Errore durante la registrazione";
        this.invioInCorso = false;
      }
    });

  }

}

