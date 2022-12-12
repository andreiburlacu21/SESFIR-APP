import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account-service/account.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isLoading: boolean = false;
  account: Account = new Account();
  userWantsToUpdate: boolean = false;

  constructor(
    private readonly notificationService: NotificationService,
    private readonly accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.loadMyData();
  }

  loadMyData() {
    this.isLoading = true;

    this.accountService.getMyData().subscribe({
      next: resp => {
        this.account = resp;
        this.isLoading = false;
      },
      error: () => {
        this.notificationService.showErrorNotification("There was a problem loading your data!");
        this.isLoading = false;
      }
    });
  }

}
