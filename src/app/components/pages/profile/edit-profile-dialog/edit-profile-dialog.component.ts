import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Account } from 'src/app/models/account.model';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
import { AccountDialogComponent } from '../../admin-pages/accounts/account-dialog/account-dialog.component';
import { Action } from 'src/app/utils/interceptor/admin-actions';

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.scss']
})

export class EditProfileDialogComponent implements OnInit {
  action: Action = Action.ADD;
  account: Account = new Account();
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  usernameFormControl = new FormControl('', [Validators.required]);
  phoneNumberFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);




  eneteredPassword: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private readonly notificationService: NotificationService,
    public dialogRef: MatDialogRef<AccountDialogComponent>) { }

  ngOnInit(): void {
    this.getPassedData();
  }

  private getPassedData() {
    this.action = this.data.action;


    if (this.action !== Action.UPDATE) {
      // this.account = this.data.account;
    }

    if (this.action === Action.DELETE) {
      this.account = this.data.account;
      // this.emailFormControl.setValue(this.account.email!!);
      // this.usernameFormControl.setValue(this.account.userName!!);
      // this.phoneNumberFormControl.setValue(this.account.phoneNumber!!);
      // this.passwordFormControl.setValue(this.account.password!!);
    }
  }

  typePassword(eneteredPassword: string) {
    this.eneteredPassword = eneteredPassword;
  }

  deleteAccount(): void {

  }

  changePassword(): void {
    
  }
}
