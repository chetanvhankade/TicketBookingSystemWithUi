import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // ✅ Add this
import { AppComponent } from './app.component';
// import { TicketBookingComponent } from './app.component';

@NgModule({
  declarations: [
    // TicketBookingComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,       // ✅ for DecimalPipe and built-in directives
    FormsModule,        // ✅ for [(ngModel)]
    ReactiveFormsModule, // ✅ for [formGroup]
    HttpClientModule,
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}