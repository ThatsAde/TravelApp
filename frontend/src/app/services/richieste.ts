import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RichiesteService {
    private apiUrl = 'http://localhost/richiesta.php';

    constructor(private http: HttpClient) {}

    inviaRichiesta(dati: any): Observable<any> {
        return this.http.post(this.apiUrl, dati);
    }
}
