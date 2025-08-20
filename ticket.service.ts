import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface TicketBooking {
  movieId?: number;
  moviename: string;
  showtime: string;
  noofseats: string;
  bookedby: string;
}

@Injectable({ providedIn: 'root' })
export class TicketService {
  private base = `${environment.apiBaseUrl}/tickets`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<TicketBooking[]> {
    return this.http.get<TicketBooking[]>(this.base);
  }

  create(payload: TicketBooking): Observable<TicketBooking> {
    return this.http.post<TicketBooking>(this.base, payload);
  }

  update(bookedby: string, payload: TicketBooking): Observable<TicketBooking> {
    return this.http.put<TicketBooking>(`${this.base}/${bookedby}`, payload);
  }

  remove(bookedby: string): Observable<any> {
    return this.http.delete(`${this.base}/${bookedby}`, { responseType: 'text' });
  }

  byMovie(moviename: string): Observable<TicketBooking[]> {
    return this.http.get<TicketBooking[]>(`${this.base}/movie/${moviename}`);
  }
}