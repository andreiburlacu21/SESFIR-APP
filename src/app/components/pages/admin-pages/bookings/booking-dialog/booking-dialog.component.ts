import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Account } from 'src/app/models/account.model';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
import { Action } from 'src/app/utils/interceptor/admin-actions';
import { AccountDialogComponent } from '../../accounts/account-dialog/account-dialog.component';

@Component({
  selector: 'app-booking-dialog',
  templateUrl: './booking-dialog.component.html',
  styleUrls: ['./booking-dialog.component.scss']
})

export class BookingDialogComponent implements OnInit {
  action: Action = Action.ADD;
  account: Account = new Account();
  accountIdFormControl = new FormControl('', [Validators.required, Validators.email]);
  locationIdFormControl = new FormControl('', [Validators.required]);
  phoneNumberFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);
  confirmPasswordFormControl = new FormControl('', [Validators.required]);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private readonly notificationService: NotificationService,
    public dialogRef: MatDialogRef<AccountDialogComponent>) { }

  ngOnInit(): void {
    this.getPassedData();
  }

  private getPassedData() {
    this.action = this.data.action;
    if (this.action !== Action.ADD) {
      this.account = this.data.account;
    }

    if(this.action === Action.UPDATE) {

    }
  }

}
