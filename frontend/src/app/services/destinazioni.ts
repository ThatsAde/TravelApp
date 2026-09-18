import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Destinazione } from '../models/destinazione.model';

@Injectable({ providedIn: 'root' })
export class DestinazioniService {

    private apiUrl = "http://localhost/api/destinazioni.php";

    constructor (private http: HttpClient) {

    }

    getDestinazioni(): Observable<Destinazione[]> {
        return this.http.get<Destinazione[]>(this.apiUrl);
    }

}
