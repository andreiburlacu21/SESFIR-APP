import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/models/booking.model';
import { LocationWithAllDetails } from 'src/app/models/location-with-all-details.model';
import { Location } from 'src/app/models/location.model';
import { Review } from 'src/app/models/review.model';
import { BookingService } from 'src/app/services/booking-service/booking.service';
import { ImageService } from 'src/app/services/image-service/image.service';
import { LocationService } from 'src/app/services/location-service/location.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
import { ReviewService } from 'src/app/services/review-service/review.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  isAdminLoggedIn: boolean = false;
  locationsWithAllDetails: LocationWithAllDetails[] = [];
  locations: Location[] = [];
  bookings: Booking[] = []
  reviews: Review[] = []

  link: string = "";

  constructor(
    private readonly notificationService: NotificationService,
    private readonly locationService: LocationService,
    private readonly bookingService: BookingService,
    private readonly reviewService: ReviewService,
    private readonly imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.isAdminLoggedIn = environment.isAdmin;

    if (!this.isAdminLoggedIn) { // load data for user
      this.loadData();
    }
  }

  private loadData() {
    this.locationService.getAllLocations().subscribe({ // get all locations
      next: locations => {
        this.locations = locations;

        this.reviewService.getAllReviews().subscribe({ // get all reviews
          next: reviews => {
            this.reviews = reviews;

            this.bookingService.getAllBookings().subscribe({ // get all bookings
              next: bookings => {
                this.bookings = bookings;

              },
              error: () => {

              }
            });
          },
          error: () => {

          }
        })
      },
      error: () => {

      }
    });
  }

  calculateLocationRating(locationId: number): number {
    let reviewsForThisLocation: Review[] = [];
    let totalScore: number = 0;

    this.reviews.forEach(review => {
      if (review.locationId === locationId) {
        totalScore += review.grade!!;
        reviewsForThisLocation.push(review);
      }
    });

    if(reviewsForThisLocation.length === 0 ) {
      return 0;
    }

    let rating: number = totalScore / reviewsForThisLocation.length;

    if(rating % 1 < 0.5) {
      return rating - 1;
    } 

    if(rating % 1 >= 0.5 ) {
      return rating + 1;
    }

    return 0;
  }
}
