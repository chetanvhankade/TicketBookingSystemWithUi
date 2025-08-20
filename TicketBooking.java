package com.example.model;

import jakarta.persistence.*;

@Entity
@Table(name="Bookings")
public class TicketBooking 
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private long movieId;
    @Column
    private String moviename;
    private  String showtime;
    private String noofseats;
    private String  bookedby; 
    
    public long getMovieId() {
        return movieId;
    }

    public String getMoviename() {
        return moviename;
    }

    public String getShowtime() {
        return showtime;
    }

    public String getNoofseats() {
        return noofseats;
    }

    public String getBookedby() {
        return bookedby;
    }
 
    public void setMovieId(long movieId)
    {
        this.movieId=movieId;
    }
    public void setMoviename(String moviename)
    {
        this.moviename=moviename;
    }
    public void setShowtime(String showtime)
    {
        this.showtime=showtime;
    }
    public void setNoofseats(String noofseats)
    {
        this.noofseats=noofseats;
    }
    public void setBookedby(String bookedby)
    {
        this.bookedby=bookedby;
    }
}
