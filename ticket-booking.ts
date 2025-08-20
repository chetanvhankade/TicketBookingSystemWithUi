import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketService, TicketBooking } from '../../services/ticket.service';
import { v4 as uuid } from 'uuid';

interface Movie { id: number; name: string; language: string; rating: string; }

@Component({
  selector: 'app-ticket-booking',
  standalone: false,
  templateUrl: './ticket-booking.html',
  styleUrl: './ticket-booking.css'
})
export class TicketBookingComponent {
  form: FormGroup;
  showtimes = ['10:00 AM', '01:00 PM', '04:00 PM', '07:00 PM', '10:00 PM'];
  paymentMethods = ['UPI', 'Debit Card', 'Credit Card', 'Net Banking', 'Wallet'];
  selectedPayment: string | null = null;

  stage: 'form' | 'payment' | 'ticket' = 'form';

  movies: Movie[] = [
    { id: 101, name: 'Starlight Odyssey', language: 'English', rating: 'U/A' },
    { id: 202, name: 'Rajadhani Express', language: 'Hindi', rating: 'U/A' },
    { id: 303, name: 'Kaveri Dreams', language: 'Kannada', rating: 'U' },
    { id: 404, name: 'The Last Monsoon', language: 'English', rating: 'U/A' },
    { id: 505, name: 'Chennai Skies', language: 'Tamil', rating: 'U' }
  ];

  bookings: TicketBooking[] = [];
  filterMovie: string = '';

  ticket: (TicketBooking & { seatNumbers: string[]; paymentMethod: string }) | null = null;
  ticketRef: string = '';

  constructor(private fb: FormBuilder, private api: TicketService) {
    this.form = this.fb.group({
      movieId: [null, [Validators.required, Validators.min(100), Validators.max(999)]],
      moviename: ['', [Validators.required, Validators.minLength(2)]],
      bookedby: ['', [Validators.required, Validators.minLength(2)]],
      noofseats: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
      showtime: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadBookings();
  }

  selectMovie(m: Movie) {
    this.form.patchValue({ movieId: m.id, moviename: m.name });
  }

  onMovieIdChange() {
    const id = this.form.value.movieId;
    const match = this.movies.find(m => m.id === Number(id));
    if (match) {
      this.form.patchValue({ moviename: match.name });
    }
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.stage = 'payment';
  }

  cancelPayment() {
    this.stage = 'form';
    this.selectedPayment = null;
  }

  confirmPayment() {
    if (!this.selectedPayment) return;
    const payload: TicketBooking = {
      movieId: Number(this.form.value.movieId),
      moviename: this.form.value.moviename,
      bookedby: this.form.value.bookedby,
      noofseats: String(this.form.value.noofseats),
      showtime: this.form.value.showtime
    };

    this.api.create(payload).subscribe({
      next: (res: TicketBooking) => {
        const seats = this.generateSeatNumbers(Number(payload.noofseats));
        this.ticket = { ...res, seatNumbers: seats, paymentMethod: this.selectedPayment! };
        this.ticketRef = uuid().split('-')[0].toUpperCase();
        this.stage = 'ticket';
        this.selectedPayment = null;
        this.loadBookings();
      },
      error: (err: any) => {
        alert('Failed to create booking. Please ensure backend is running.');
        console.error(err);
        this.stage = 'form';
      }
    });
  }

  generateSeatNumbers(count: number): string[] {
    const rows = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const seats: string[] = [];
    const baseRow = rows[Math.floor(Math.random() * 10)];
    const start = Math.floor(Math.random() * 20) + 1;
    for (let i = 0; i < count; i++) {
      seats.push(`${baseRow}${start + i}`);
    }
    return seats;
  }

  loadBookings() {
    const filter = this.filterMovie?.trim();
    if (filter) {
      this.api.byMovie(filter).subscribe({
        next: (list: TicketBooking[]) => (this.bookings = list),
        error: () => (this.bookings = [])
      });
    } else {
      this.api.getAll().subscribe({
        next: (list: TicketBooking[]) => (this.bookings = list),
        error: () => (this.bookings = [])
      });
    }
  }

  delete(bookedby: string) {
    if (!confirm(`Delete booking for ${bookedby}?`)) return;
    this.api.remove(bookedby).subscribe({
      next: () => this.loadBookings(),
      error: (e: any) => alert('Delete failed')
    });
  }

  reset() {
    this.form.reset();
    this.stage = 'form';
    this.ticket = null;
  }
}