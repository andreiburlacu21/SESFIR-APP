import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/account.model';
import Authentication from 'src/app/models/authentication.model';
import { Location } from 'src/app/models/location.model';
import { Booking } from 'src/app/models/booking.model';
import { LocationWithAllDetails } from 'src/app/models/location-with-all-details.model';
import { Review } from 'src/app/models/review.model';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { ImageService } from 'src/app/services/image-service/image.service';
import { LocationService } from 'src/app/services/location-service/location.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
import { ReviewService } from 'src/app/services/review-service/review.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-or-register',
  templateUrl: './login-or-register.component.html',
  styleUrls: ['./login-or-register.component.scss']
})

export class LoginOrRegisterComponent {
  isLoading: boolean = false;
  isGuestHomePageLoading: boolean = false;
  @Output() login = new EventEmitter<{ loggedIn: boolean }>();
  @Output() registerData = new EventEmitter<{ email: string, username: string, password: string }>();
  userWantsToLogin: boolean = true;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  usernameFormControl = new FormControl('');
  phoneNumberFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);
  confirmPasswordFormControl = new FormControl('', [Validators.required]);
  userWantsToEnterAsGuest: boolean = false;

  accounts: Account[] = [];







  locationsWithAllDetails: LocationWithAllDetails[] = [];
  locations: Location[] = [];
  filteredLocations: Location[] = [];
  bookings: Booking[] = []
  reviews: Review[] = []
  searchInputByName: string = ""
  searchInputByAddress: string = ""

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private readonly locationService: LocationService,
    private readonly reviewService: ReviewService,
    private readonly imageService: ImageService,
    private authService: AuthenticationService) { }

  logIn() {
    this.isLoading = true;

    let username: string = this.usernameFormControl.getRawValue() ?? "";
    let password: string = this.passwordFormControl.getRawValue() ?? "";

    this.authService.authenticate(new Authentication(username, password)).subscribe({
      next: token => {
        if (token) {
          this.authService.setAuth(token);

          this.login.emit({
            loggedIn: this.authService.loggedIn()
          });

          this.isLoading = false;
          this.notificationService.showSuccessNotification("Welcome!");

          this.router.navigate([`/home`]);
        }
      }, error: () => { this.isLoading = false; }
    });
  }

  register() {
    if (this.passwordFormControl.getRawValue() === this.confirmPasswordFormControl.getRawValue()) {
      let newAccount: Account = new Account();
      newAccount.email = this.emailFormControl.getRawValue() ?? "";
      newAccount.userName = this.usernameFormControl.getRawValue() ?? "";
      newAccount.password = this.passwordFormControl.getRawValue() ?? "";
      newAccount.phoneNumber = this.phoneNumberFormControl.getRawValue() ?? "";
      this.authService.register(newAccount).subscribe({
        next: () => {
          this.userWantsToLogin = true;
          this.notificationService.showSuccessNotification("Account created!");
        }, error: (err) => {
          this.notificationService.showErrorNotification(err.error);
          console.log(err);
        }
      }
      );
    } else {
      this.notificationService.showSuccessNotification("Entered passwords are different!");
    }
  }

  letMeInAsAGuest() {
    this.userWantsToEnterAsGuest = true;
  }

  userWantsToRegister() {
    this.emailFormControl.setValue('');
    this.passwordFormControl.setValue('');
    this.userWantsToLogin = false;
  }

  backToLogin() {
    this.emailFormControl.setValue('');
    this.usernameFormControl.setValue('');
    this.passwordFormControl.setValue('');
    this.confirmPasswordFormControl.setValue('');
    this.userWantsToLogin = true;
  }




































  ngOnInit(): void {
    this.loadData();
  }


  private getHeaderImage(localion: Location) {
    this.imageService.getImages("location", localion.locationId!).subscribe({
      next: images => {
        console.log("Header image: ", images)
        localion.headerImage = images[0];
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  private loadData() {
    this.isGuestHomePageLoading = true;
    this.locationService.getAllLocations().subscribe({ // get all locations
      next: locations => {
        this.locations = locations;

        this.locations.forEach(foundLocation => this.getHeaderImage(foundLocation));

        this.filteredLocations = this.locations;

        this.reviewService.getAllReviews().subscribe({ // get all reviews
          next: reviews => {
            this.reviews = reviews;
            this.isGuestHomePageLoading = false;
          },
          error: () => {
            this.isGuestHomePageLoading = false;
          }
        })
      },
      error: () => {
        this.isGuestHomePageLoading = false;
      }
    });
  }

  searchByName() {
    if (this.searchInputByName !== "") {
      this.searchInputByAddress = "";
      this.filteredLocations = this.locations.filter(location => location.locationName?.includes(this.searchInputByName));
    } else {
      this.filteredLocations = this.locations;
    }
  }

  searchByAddress() {
    if (this.searchInputByAddress !== "") {
      this.searchInputByName = ""
      this.filteredLocations = this.locations.filter(location => location.address?.includes(this.searchInputByAddress));
    } else {
      this.filteredLocations = this.locations;
    }
  }

  clearFilters() {
    this.searchInputByName = ""
    this.searchInputByAddress = "";
    this.filteredLocations = this.locations;
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

    if (reviewsForThisLocation.length === 0) {
      return 0;
    }

    let rating: number = totalScore / reviewsForThisLocation.length;

    if (rating % 1 < 0.5) {
      return Math.floor(rating);
    }

    if (rating % 1 >= 0.5) {
      return Math.ceil(rating);
    }

    return 0;
  }

  seeMore(location: Location) {
    environment.locationX = location.locationX!!;
    environment.locationY = location.locationY!!;
    this.router.navigateByUrl('/location-page', { state: location });
  }

  guestWantsToLogIn() {
    this.userWantsToEnterAsGuest = false;
  }
}
