import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Destinazione } from '../models/destinazione.model';
import { AuthService } from './auth';

@Injectable({ providedIn: 'root' })
export class AdminDestinazioniService {
    private http = inject(HttpClient);
    private auth = inject(AuthService);
    private apiUrl = 'http://localhost:8000/api/destinazioni';
    private richiesteUrl = 'http://localhost:8000/api/richieste';

    private authHeaders(): HttpHeaders {
        return new HttpHeaders({
            Authorization: `Bearer ${this.auth.token()}`
        });
    }

    crea(dati: Partial<Destinazione>): Observable<any> {
        return this.http.post(this.apiUrl, dati, { headers: this.authHeaders() });
    }

    modifica(id: number, dati: Partial<Destinazione>): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, dati, { headers: this.authHeaders() });
    }

    elimina(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.authHeaders() });
    }

    listaRichieste(): Observable<any[]> {
        return this.http.get<any[]>(this.richiesteUrl, { headers: this.authHeaders() });
    }
}