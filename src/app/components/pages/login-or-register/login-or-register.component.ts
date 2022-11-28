import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/account.model';
import Authentication from 'src/app/models/authentication.model';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';

@Component({
  selector: 'app-login-or-register',
  templateUrl: './login-or-register.component.html',
  styleUrls: ['./login-or-register.component.scss']
})

export class LoginOrRegisterComponent {
  @Output() login = new EventEmitter<{ loggedIn: boolean }>();
  @Output() registerData = new EventEmitter<{ email: string, username: string, password: string }>();
  userWantsToLogin: boolean = true;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  usernameFormControl = new FormControl('');
  passwordFormControl = new FormControl('', [Validators.required]);
  confirmPasswordFormControl = new FormControl('', [Validators.required]);

  accounts: Account[] = [];

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private authService: AuthenticationService) { }

  logIn() {
    let username: string = this.usernameFormControl.getRawValue() ?? "";
    let password: string = this.passwordFormControl.getRawValue() ?? "";

    this.authService.authenticate(new Authentication(username, password)).subscribe({
      next: token => {
        console.log(token);
        if (token) {
          this.authService.setAuth(token);

          this.login.emit({
            loggedIn: this.authService.loggedIn()
          });

          this.notificationService.showSuccessNotification("Welcome!");

          this.router.navigate([`/home`]);
        }
      }, error: () => { }
    });
  }

  register() {
    console.log("Creating account with with:");
    console.log("Email: " + this.emailFormControl.getRawValue());
    console.log("Username: " + this.usernameFormControl.getRawValue());
    console.log("Password: " + this.passwordFormControl.getRawValue());
    console.log("Confirmed password: " + this.confirmPasswordFormControl.getRawValue());

    if (this.passwordFormControl.getRawValue() === this.confirmPasswordFormControl.getRawValue()) {
      this.notificationService.showSuccessNotification("Account created!");
      this.userWantsToLogin = true;
      // TODO: implement register 
      let newAccount: Account = new Account();
      newAccount.email = this.emailFormControl.getRawValue() ?? "";
      newAccount.userName = this.usernameFormControl.getRawValue() ?? "";
      newAccount.password = this.usernameFormControl.getRawValue() ?? "";
      newAccount.phoneNumber = "0756514123";
      this.authService.register(newAccount).subscribe({
        next: resp => {
          console.log(resp);
        }, error: err => {
          console.error(err);
        }
      }
      );
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
