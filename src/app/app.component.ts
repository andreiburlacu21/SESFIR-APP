import { OverlayContainer } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
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
  theme = 'LIGHT'

  constructor(private _overlayContainer: OverlayContainer,
    private notificationService: NotificationService,
    private authenticationService: AuthenticationService) {}

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
      this.changeThemeInOverlayContainer('dark-theme');
    } else {
      this.theme = 'LIGHT';
      this.changeThemeInOverlayContainer('light-theme')
    }
  }

  userLoggedIn(eventData: { loggedIn: boolean }) {
    if(eventData.loggedIn) {
      this.isUserLoggedId = true;
    }
  }

  logout() {
    // TODO: implement logout
    this.authenticationService.logOut();
    this.notificationService.showSuccessNotification("See you soon!");
    this.isUserLoggedId = false;
  }
}
