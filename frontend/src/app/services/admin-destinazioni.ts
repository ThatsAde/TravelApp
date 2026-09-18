import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Destinazione } from '../models/destinazione.model';

@Injectable({providedIn: 'root'})
export class AdminDestinazioniService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost/api/admin';

    crea(dati: Partial<Destinazione>): Observable<any> {
        return this.http.post(`${this.apiUrl}/crea-destinazione.php`, dati);
    }

    modifica(id: number, dati: Partial<Destinazione>): Observable<any> {
        return this.http.post(`${this.apiUrl}/modifica-destinazione.php`, { id, ...dati });
    }

    elimina(id: number): Observable<any> {
        return this.http.post(`${this.apiUrl}/elimina-destinazione.php`, { id });
    }

    listaRichieste(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/lista-richieste.php`);
    }
}
