import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/models/booking.model';
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
  ) {}

  ngOnInit(): void {
    this.isAdminLoggedIn = environment.isAdmin;

    if(!this.isAdminLoggedIn) { // load data for user
      this.loadData();
    }
  }

  private loadData() {
    this.locationService.getAllLocations().subscribe({
      next: resp => {
        this.locations = resp;
      },
      error: () => {

      }
    });

    this.imageService.getImages("location", 1).subscribe(resp => this.link = resp[0]);
  }
}
