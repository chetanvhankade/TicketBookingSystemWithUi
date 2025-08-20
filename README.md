# 🎬 Ticket Booking System

A full-stack **Movie Ticket Booking System** with **Spring Boot (Backend)** and **Angular (Frontend)**.  

---

## 🚀 Features
- 🎥 Choose from a list of popular movies (Saaho, Kalki 2898 AD, KGF 1 & 2, Pushpa 2, RRR, Salaar, Baahubali, etc.)  
- 🕒 Select showtimes (Morning, Afternoon, Evening, Night)  
- 👤 Enter customer name and number of seats  
- 💳 Multiple payment methods (UPI, Debit/Credit Card, Net Banking, Wallet, Cash)  
- ✅ Book tickets, view booked tickets, filter by movie, and delete tickets  
- 🔄 Angular frontend with REST API integration  

---

## 🛠 Tech Stack
### Backend:
- Java 17+  
- Spring Boot 3+  
- Spring Web, Spring Data JPA    

### Frontend (Angular):
- Angular 16+  
- TypeScript  
- Angular Forms & HttpClient  

### Alternative Frontend:
- HTML5, CSS3, JavaScript (Fetch API)  


📸 Screenshots

!Frontend


<img width="929" height="922" alt="backend" src="https://github.com/user-attachments/assets/1d272265-4669-4eb5-9605-7ad056dbb5e9" />

















!Backend

<img width="1518" height="867" alt="backend" src="https://github.com/user-attachments/assets/c275853a-963c-4950-ba31-515cb0beffd5" />











!Database

 CREATE TABLE Bookings (
    bookedby VARCHAR(100) PRIMARY KEY,   
    movie_id INT NOT NULL,
    moviename VARCHAR(200) NOT NULL,
    noofseats INT NOT NULL,
    showtime VARCHAR(50) NOT NULL
);
