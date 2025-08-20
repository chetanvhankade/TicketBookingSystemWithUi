package com.example.service;

import com.example.model.TicketBooking;
import com.example.Repository.TicketRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketService {

    private final TicketRepository repository;

    public TicketService(TicketRepository repository) {
        this.repository = repository;
    }

    public TicketBooking addBooking(TicketBooking booking) {
        return repository.save(booking);
    }

    public TicketBooking updateBooking(String bookedby, TicketBooking updatedBooking) {
        TicketBooking booking = repository.findByBookedby(bookedby)
                .orElseThrow(() -> new EntityNotFoundException("Booking not found for user: " + bookedby));

        booking.setMoviename(updatedBooking.getMoviename());
        booking.setShowtime(updatedBooking.getShowtime());
        booking.setNoofseats(updatedBooking.getNoofseats());

        return repository.save(booking);
    }

    public void deleteBooking(String bookedby) {
        TicketBooking booking = repository.findByBookedby(bookedby)
                .orElseThrow(() -> new EntityNotFoundException("Booking not found for user: " + bookedby));
        repository.delete(booking);
    }

    public List<TicketBooking> getAllBookings() {
        return repository.findAll();
    }

    public List<TicketBooking> getBookingsByMovie(String moviename) {
        return repository.findByMoviename(moviename);
    }
}
