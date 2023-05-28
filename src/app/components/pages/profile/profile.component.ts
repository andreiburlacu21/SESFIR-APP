import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Account } from 'src/app/models/account.model';
import { BookingEntity } from 'src/app/models/booking-entity.model';
import { ReviewEntity } from 'src/app/models/review-entity.model';
import { AccountService } from 'src/app/services/account-service/account.service';
import { BookingService } from 'src/app/services/booking-service/booking.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
import { ReviewService } from 'src/app/services/review-service/review.service';
import { EditProfileDialogComponent } from './edit-profile-dialog/edit-profile-dialog.component';
import { Action } from 'src/app/utils/interceptor/admin-actions';
import { ImageService } from 'src/app/services/image-service/image.service';

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
  uploadedImage!: File;
  imageSelected: boolean = false;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  usernameFormControl = new FormControl('', [Validators.required]);
  phoneNumberFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);
  confirmPasswordFormControl = new FormControl('', [Validators.required]);

  constructor(
    private readonly notificationService: NotificationService,
    private readonly accountService: AccountService,
    private readonly bookingService: BookingService,
    private readonly reviewService: ReviewService,
    private readonly imageService: ImageService,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadMyData();
  }

  loadMyData() {
    this.isLoading = true;

    this.accountService.getMyData().subscribe({
      next: resp => {
        this.account = resp;
        console.log("DATA: ", this.account);
        this.setCurrentAccountInfoInCaseUserWantsToEdit();
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

  private setCurrentAccountInfoInCaseUserWantsToEdit(): void {
    this.emailFormControl.setValue(this.account.email!);
    this.usernameFormControl.setValue(this.account.userName!);
    this.phoneNumberFormControl.setValue(this.account.phoneNumber!);
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
    console.log(this.account.accountId)
    this.bookingService.getBookingEntityById(this.account.accountId!!).subscribe({
      next: resp => {
        this.myBookings = resp;

        console.log(this.myBookings);

        this.bookingsAreLoading = false;
      },
      error: () => {
        this.bookingsAreLoading = false;
        this.notificationService.showErrorNotification("There was an error while loading your bookings!");
      }
    });
  }

  userWantsToEdit(): void {
    this.userWantsToUpdate = true;
  }

  saveChanges(): void {
    this.userWantsToUpdate = false;
    // TODO: update account info in the db
  }

  changePassword(): void {
    // TODO: change password
  }

  deleteAccount(): void {
    let dialogRef = this.dialog.open(EditProfileDialogComponent, {
      data: {
        action: Action.DELETE,
        account: this.account
      }
    })

    dialogRef.afterClosed().subscribe(accountId => {
      // if(accountId.data) {
      //   this.accountService.deleteAccount(accountId.data).subscribe(resp => {
      //     if(resp) {
      //       this.notificationService.showSuccessNotification("Account deleted!");
      //       this.getAllAccounts();
      //     }
      //   });
      // }
    });
  }

  addProfilePicture(): void {
    const formData = new FormData();
    
    formData.append("file", this.uploadedImage);
    formData.append("id", this.account.accountId?.toString() ?? "0");
    formData.append("type", "Profile");
    this.imageService.uploadImage(formData).subscribe({
      next: () => {
        this.notificationService.showSuccessNotification("Image uploaded!");
      },
      error: err => {
        this.notificationService.showErrorNotification("Upload failed!");
      }
    });
  }
  


  uploadFile(event: any) {
    this.uploadedImage = event.target.files[0];
    this.imageSelected = true;
  }
}
