import { Injectable } from "@angular/core";
import { MatCalendarCellClassFunction } from "@angular/material/datepicker";
import { Booking } from "../models/booking.model";
import { BookingService } from "../services/booking-service/booking.service";

export class DateHelper {
    private dictionary!: Map<number | undefined, [string | undefined , string | undefined] >;

    constructor(private service: BookingService, locationId: number) {
        this.dictionary = new Map();
        service.getBookingsByLocationId(locationId).subscribe(bookings =>
            bookings.forEach(value => this.dictionary.set(value.bookingId, [value.inDate, value.outDate]
            )));
    }

    static getDate(date: any) {
        return (new Date(date)).toLocaleDateString().replace("/", "-").replace("/", "-");
    }

    myFilter = (d: Date | null): boolean => {


     


        if (d) {
            const day = d.getDay();
            return day !== 0 && day !== 6;
        }
        return true;
    }

    //   dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    //     var date = DateHelper.getDate(cellDate);
    //     const bool: boolean = (this.bookings.indexOf(date) > -1);
    //     return bool ? 'custom-date-class' : '';
    //   };
}