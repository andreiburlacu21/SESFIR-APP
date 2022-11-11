import { OverlayContainer } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router,
    private _overlayContainer: OverlayContainer) {}

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

  logout() {
    // TODO: implement logout
    this.router.navigate([`login-or-register`]);
  }
}
