import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account-service/account.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';

@Component({
  selector: 'app-login-or-register',
  templateUrl: './login-or-register.component.html',
  styleUrls: ['./login-or-register.component.scss']
})

export class LoginOrRegisterComponent implements OnInit {
  @Output() login = new EventEmitter<{ loggedIn: boolean }>();
  @Output() registerData = new EventEmitter<{ email: string, username: string, password: string }>();
  userWantsToLogin: boolean = true;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  usernameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);
  confirmPasswordFormControl = new FormControl('', [Validators.required]);

  accounts: Account[] = [];

  constructor(
    private router: Router, 
    private notificationService: NotificationService,
    private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.getAllAccounts().subscribe({
      next: resp => {
        console.log(resp);
      }, error: () => {
        this.notificationService.showErrorNotification("There was an issue setting up the application, please refresh and try again!");
      }
    });
  }

  logIn() {
    console.log("Logging with:");
    console.log("Email: " + this.emailFormControl.getRawValue());
    console.log("Password: " + this.passwordFormControl.getRawValue());

    // TODO: implement login

    this.login.emit({
      loggedIn: true
    });
    
    this.notificationService.showSuccessNotification("Welcome!");
    this.router.navigate([`/home`]);
  }

  register() {
    console.log("Creating account with with:");
    console.log("Email: " + this.emailFormControl.getRawValue());
    console.log("Username: " + this.usernameFormControl.getRawValue());
    console.log("Password: " + this.passwordFormControl.getRawValue());
    console.log("Confirmed password: " + this.confirmPasswordFormControl.getRawValue());

    if(this.passwordFormControl.getRawValue() === this.confirmPasswordFormControl.getRawValue()) {
      this.notificationService.showSuccessNotification("Account created!");
      this.userWantsToLogin = true;
      // TODO: implement register 
    } else {
      this.notificationService.showSuccessNotification("Entered passwords are different!");
    }
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
}
