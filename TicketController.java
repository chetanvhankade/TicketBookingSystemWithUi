package com.example.controller;

import com.example.model.TicketBooking;
import com.example.service.TicketService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = {"http://127.0.0.1:5500", "http://localhost:5500"})
public class TicketController {

    private final TicketService service;

    public TicketController(TicketService service) {
        this.service = service;
    }

    @GetMapping
    public List<TicketBooking> getAllTickets() {
        return service.getAllBookings();
    }

    @PutMapping("/{bookedby}")
    public TicketBooking updateTicket(@PathVariable String bookedby, @RequestBody TicketBooking ticketBooking) {
        return service.updateBooking(bookedby, ticketBooking);
    }

    @PostMapping
    public TicketBooking createTicket(@RequestBody TicketBooking ticketBooking) {
        return service.addBooking(ticketBooking);
    }

    @DeleteMapping("/{bookedby}")
    public String deleteBooking(@PathVariable String bookedby) {
        service.deleteBooking(bookedby);
        return "Booking deleted for user: " + bookedby;
    }

    @GetMapping("/movie/{moviename}")
    public List<TicketBooking> getBookingsByMovie(@PathVariable String moviename) {
        return service.getBookingsByMovie(moviename);
    }
}