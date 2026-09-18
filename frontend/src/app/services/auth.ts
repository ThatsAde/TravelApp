import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Service, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

interface Utente {
    id: number;
    nome: string;
    email: string;
    ruolo: string;
}

interface LoginResponse {
    token: string;
    utente: Utente;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    private http = inject(HttpClient);
    private apiUrl = 'http://localhost/api'

    token = signal<string | null>(localStorage.getItem('token'));
    utente = signal<Utente | null>(this.leggiUtenteSalvato());
    
    private leggiUtenteSalvato(): Utente | null {
        const raw = localStorage.getItem('utente');
        return raw ? JSON.parse(raw) : null;
    }

    register(nome: string, email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/register.php`, { nome, email, password }).pipe(
        tap(res => {
        this.token.set(res.token);
        this.utente.set(res.utente);
        localStorage.setItem('token', res.token);
        localStorage.setItem('utente', JSON.stringify(res.utente));
        })
    );
    }

    login(email: string, password: string): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.apiUrl}/login.php`, { email, password }).pipe(
            tap(res => {
                this.token.set(res.token);
                this.utente.set(res.utente);
                localStorage.setItem('token', res.token);
                localStorage.setItem('utente', JSON.stringify(res.utente));
            })
        );
    }

    logout(): void {
        this.token.set(null);
        this.utente.set(null);
        localStorage.removeItem('token');
        localStorage.removeItem('utente');
    }

    isLoggedIn(): boolean {
        return this.token() !== null;
    }

    isAdmin(): boolean {
        return this.utente()?.ruolo === 'admin';
    }

}
