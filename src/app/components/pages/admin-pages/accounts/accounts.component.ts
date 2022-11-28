import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account-service/account.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})

export class AccountsComponent implements OnInit {
  isLoading: boolean = false;
  accounts: Account[] = [];
  displayedColumns: string[] = ["Username", "Email", "Password", "Phone Number", "Role"];

  constructor(private readonly accountService: AccountService, private readonly notificationService: NotificationService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.getAllAccounts();
  }

  private getAllAccounts() {
    this.accountService.getAllAccounts().subscribe({
      next: resp => {
        this.accounts = resp;
        console.log(this.accounts);
        this.isLoading = false;
      },
      error: () => {
        this.notificationService.showErrorNotification("There was an error while loading existing accounts!");
        this.isLoading = false;
      }
    });
  }
}