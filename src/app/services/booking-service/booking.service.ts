import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingWithEntities } from 'src/app/models/booking-entity.model';
import { Booking } from 'src/app/models/booking.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private reqPath: string = "";

  constructor(private httpClient: HttpClient) {
    this.reqPath = environment.apiBaseUrl + "Bookings";
  }

  getAllBookings(): Observable<Booking[]> {
    return this.httpClient.get<Booking[]>(this.reqPath + "/all");
  }

  getMyBookings(): Observable<BookingWithEntities[]> {
    return this.httpClient.get<BookingWithEntities[]>(this.reqPath + "/MyBookings");
  }

  getBookingEntityById(bookingId: number): Observable<BookingWithEntities[]> {
    return this.httpClient.get<BookingWithEntities[]>(this.reqPath + "/Entity/" + bookingId);
  }

  addBooking(booking: Booking): Observable<Booking> {
    return this.httpClient.post<Booking>(this.reqPath + "/insert", booking);
  }

  updateBooking(booking: Booking): Observable<Booking> {
    return this.httpClient.put<Booking>(this.reqPath + "/update", booking);
  }

  deleteBooking(bookingId: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(this.reqPath + "/" + bookingId);
  }
  checkAppointmentDate(date: any) {
    return this.httpClient.get<boolean>(this.reqPath + "/dateval" + date);
  }
  getCurrentDates(locationId: number) {
    return this.httpClient.get<string[]>(this.reqPath + `/dates/${locationId}`);
  }
  getBookingsByLocationId(locationId: number) {
    return this.httpClient.get<Booking[]>(this.reqPath + `/byLocationid/${locationId}`);
  }
}
