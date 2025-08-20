package com.example.Repository;

import com.example.model.TicketBooking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TicketRepository extends JpaRepository<TicketBooking, Long> {
    Optional<TicketBooking> findByBookedby(String bookedby);
    List<TicketBooking> findByMoviename(String moviename);
}
