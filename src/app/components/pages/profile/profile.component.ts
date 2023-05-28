import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Account } from 'src/app/models/account.model';
import { BookingWithEntities } from 'src/app/models/booking-entity.model';
import { ReviewEntity } from 'src/app/models/review-entity.model';
import { AccountService } from 'src/app/services/account-service/account.service';
import { BookingService } from 'src/app/services/booking-service/booking.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
import { ReviewService } from 'src/app/services/review-service/review.service';
import { EditProfileDialogComponent } from './edit-profile-dialog/edit-profile-dialog.component';
import { Action } from 'src/app/utils/interceptor/admin-actions';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
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
  myBookings: BookingWithEntities[] = [];
  imageLink!: string | null | ArrayBuffer;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  usernameFormControl = new FormControl('', [Validators.required]);
  phoneNumberFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);
  confirmPasswordFormControl = new FormControl('', [Validators.required]);
  uploadedImage!: File;
  imageSelected: boolean = false;

  constructor(
    private readonly notificationService: NotificationService,
    private readonly accountService: AccountService,
    private readonly authService: AuthenticationService,
    private readonly bookingService: BookingService,
    private readonly imageService: ImageService,
    private readonly reviewService: ReviewService,
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
        this.setProfilePicture();
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

  private setProfilePicture(){
    this.imageService.getImages("Profile", this.account.accountId).subscribe({
      next: resp => {
        this.imageLink = resp[0];
      },
      error: () => {
        //this.notificationService.showErrorNotification("There was a problem loading your data!");
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
    this.bookingService.getMyBookings().subscribe({
      next: resp => {
        this.myBookings = resp;
        this.bookingsAreLoading = false;
      },
      error: (err) => {
        this.bookingsAreLoading = false;
        console.log(err);
        this.notificationService.showErrorNotification("There was an error while loading your bookings!");
      }
    });
  }

  userWantsToEdit(): void {
    this.userWantsToUpdate = true;
  }

  discardChanges(): void {
    this.userWantsToUpdate = false;
    this.imageLink = null;
  }

  saveChanges(): void {
    this.userWantsToUpdate = false;

    let newAccount: Account = new Account();
    newAccount = this.account;
    newAccount.email = this.emailFormControl.getRawValue() ?? "";
    newAccount.userName = this.usernameFormControl.getRawValue() ?? "";
    newAccount.phoneNumber = this.phoneNumberFormControl.getRawValue() ?? "";
    newAccount.password = this.account.password;
    newAccount.role = this.account.role;
    
    this.addProfilePicture();

    if (newAccount.email !== "" && newAccount.userName !== "" && newAccount.phoneNumber !== "") {
      this.accountService.updateAccount(newAccount).subscribe({
        next: resp => {
          this.account = resp;
          this.notificationService.showSuccessNotification("Changes were saved!");
        },
        error: err => {
          console.log(err);
          this.notificationService.showErrorNotification("There was an error saving your changes!");
        }
      });
    }
  }

  changePassword(): void {
    let dialogRef = this.dialog.open(EditProfileDialogComponent, {
      data: {
        action: Action.UPDATE,
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
      // TODO: change password
    });
  }

  deleteAccount(): void {
    let dialogRef = this.dialog.open(EditProfileDialogComponent, {
      data: {
        action: Action.DELETE,
        account: this.account
      }
    })

    dialogRef.afterClosed().subscribe(accountId => {
      if (accountId.data) {
        this.accountService.deleteAccount(accountId.data).subscribe(resp => {
          if (resp) {
            this.notificationService.showSuccessNotification("Sorry to see you go!");

            this.authService.logOut();
          }
        });
      }
    });
  }

  uploadFile(event: any) {
    this.uploadedImage = event.target.files[0];
    this.imageSelected = true;

    const reader = new FileReader();
    reader.onload = e => this.imageLink = reader.result;

    reader.readAsDataURL(this.uploadedImage);

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

}
