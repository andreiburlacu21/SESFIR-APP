import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/models/account.model';
import { BookingEntity } from 'src/app/models/booking-entity.model';
import { Booking } from 'src/app/models/booking.model';
import { ReviewEntity } from 'src/app/models/review-entity.model';
import { Review } from 'src/app/models/review.model';
import { AccountService } from 'src/app/services/account-service/account.service';
import { BookingService } from 'src/app/services/booking-service/booking.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
import { ReviewService } from 'src/app/services/review-service/review.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isLoading: boolean = false;
  reviewsAreLoading: boolean = false;
  bookingsAreLoading: boolean = false;
  account: Account = new Account();
  userWantsToUpdate: boolean = false;
  myReviews: ReviewEntity[] = [];
  myBookings: BookingEntity[] = [];

  constructor(
    private readonly notificationService: NotificationService,
    private readonly accountService: AccountService,
    private readonly bookingService: BookingService,
    private readonly reviewService: ReviewService
  ) { }

  ngOnInit(): void {
    this.loadMyData();
  }

  loadMyData() {
    this.isLoading = true;

    this.accountService.getMyData().subscribe({
      next: resp => {
        this.account = resp;
        this.getAllReviews();
        this.getAllBookings();
        this.isLoading = false;
      },
      error: () => {
        this.notificationService.showErrorNotification("There was a problem loading your data!");
        this.isLoading = false;
      }
    });
  }

  private getAllReviews() {
    this.reviewsAreLoading = true;
    this.reviewService.myReviews().subscribe({
      next: resp => {
        this.myReviews = resp;
        this.reviewsAreLoading = false;       
      },
      error: () => {
        this.reviewsAreLoading = false;
        this.notificationService.showErrorNotification("There was an error while loading your reviews!");
      }
    });
  }

  private getAllBookings() {
    this.bookingsAreLoading = true;
    this.bookingService.getBookingEntityById(this.account.accountId!!).subscribe({
      next: resp => {
        this.myBookings = resp;

        this.bookingsAreLoading = false;
      },
      error: () => {
        this.bookingsAreLoading = false;
        this.notificationService.showErrorNotification("There was an error while loading your bookings!");
      }
    });
  }
}
