import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Booking } from 'src/app/models/booking.model';
import { BookingService } from 'src/app/services/booking-service/booking.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
import { DateHelper } from 'src/app/utils/date-helper';
import { Action } from 'src/app/utils/interceptor/admin-actions';
import { AccountDialogComponent } from '../../accounts/account-dialog/account-dialog.component';

@Component({
  selector: 'app-booking-dialog',
  templateUrl: './booking-dialog.component.html',
  styleUrls: ['./booking-dialog.component.scss']
})

export class BookingDialogComponent implements OnInit {
  action: Action = Action.ADD;
  booking: Booking = new Booking();
  accountIdFormControl = new FormControl('', [Validators.required]);
  locationIdFormControl = new FormControl('', [Validators.required]);
  phoneNumberFormControl = new FormControl('', [Validators.required]);
  inDateFormControl = new FormControl(new Date(), [Validators.required]);
  outDateFormControl = new FormControl(new Date(), [Validators.required]);
  checkInDate: any = null;
  totalPriceFormControl = new FormControl(0, [Validators.required]);
  minDate: any = new Date;
  myFilter: any;
  dateClass: any;
  enableDates: boolean = false;
  private dateHelper !: DateHelper;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private readonly notificationService: NotificationService,
    private bookingService: BookingService,
    public dialogRef: MatDialogRef<AccountDialogComponent>) { }

  ngOnInit(): void {
    this.getPassedData();
  }

  private getPassedData() {
    this.action = this.data.action;
    if (this.action !== Action.ADD) {
      this.booking = this.data.booking;
    }

    if(this.action === Action.UPDATE) {
      this.accountIdFormControl.setValue(this.booking.accountId+"");
      this.locationIdFormControl.setValue(this.booking.locationId+"");
      this.phoneNumberFormControl.setValue(this.booking.phoneNumber!!);
      this.inDateFormControl.setValue(new Date(this.booking.inDate!!));
      this.outDateFormControl.setValue(new Date(this.booking.outDate!!));
      this.totalPriceFormControl.setValue(this.booking.totalPrice!!);
    }
  }

  setAvailabilityDate(){
    var id = this.locationIdFormControl.getRawValue() as unknown as number; 
    this.enableDates = true;
    this.dateHelper = new DateHelper(this.bookingService, id);
    this.myFilter = this.dateHelper.myFilter;
    //this.dateClass = this.dateHelper.dateClass;

  }

  addBooking() {

  }

  updateBooking() {

  }

  deleteBooking() {

  }

}
