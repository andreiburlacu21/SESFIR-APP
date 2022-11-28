import { OverlayContainer } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './services/authentication-service/authentication.service';
import { NotificationService } from './services/notification-service/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'SESFIR';
  openSideMenu: boolean = false;
  isUserLoggedId: boolean = false;
  theme: string = 'LIGHT';

  constructor(private _overlayContainer: OverlayContainer,
    private notificationService: NotificationService,
    private authenticationService: AuthenticationService) {
      if(!localStorage.getItem('theme') === null) {
        this.updateThemeInLocalStorage();
      } else {
        this.theme = localStorage.getItem('theme') as string;
        if(this.theme === 'LIGHT') {
          this.changeThemeInOverlayContainer('light-theme');
        } else {
          this.changeThemeInOverlayContainer('dark-theme');
        }
      }
    }

  openOrCloseTheSideMenu(eventData: { openSideMenu: boolean }) {
    this.openSideMenu = eventData.openSideMenu;
  }

  private changeThemeInOverlayContainer(theme: 'dark-theme' | 'light-theme'): void {
    const overlayContainerClasses = this._overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(overlayContainerClasses);
    themeClassesToRemove.filter((item: string) => item.includes('-theme'));

    if(overlayContainerClasses.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
    overlayContainerClasses.add(theme);
  }

  changeTheme(eventData: { changeToDarkMode: boolean }): void {
    if(eventData.changeToDarkMode) {
      this.theme = 'DARK';
      this.updateThemeInLocalStorage();
      this.changeThemeInOverlayContainer('dark-theme');
    } else {
      this.theme = 'LIGHT';
      this.updateThemeInLocalStorage();
      this.changeThemeInOverlayContainer('light-theme')
    }
    environment.theme = this.theme;
  }

  private updateThemeInLocalStorage() {
    localStorage.setItem('theme', this.theme);
  }

  userLoggedIn(eventData: { loggedIn: boolean }) {
    if(eventData.loggedIn) {
      this.isUserLoggedId = true;
      if(this.authenticationService.isAdmin()) {
        environment.isAdmin = true;
      }
    }
  }

  logout() {
    this.authenticationService.logOut();
    this.notificationService.showSuccessNotification("See you soon!");
    this.isUserLoggedId = false;
  }
}
