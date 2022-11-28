import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/models/booking.model';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
  isLoading: boolean = false;
  bookings: Booking[] = [];

  constructor() { }

  ngOnInit(): void {

  }

  addBooking() {

  }

  editBooking(booking: Booking) {

  }

  deleteBooking(booking: Booking) {

  }
}
