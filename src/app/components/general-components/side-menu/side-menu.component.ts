import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})

export class SideMenuComponent implements OnInit {
  @Input() currentTheme: String | undefined;
  @Output() themeChanged = new EventEmitter<{ changeToDarkMode: boolean }>();
  isDarkModeSelected: boolean = false;
  elem: any;
  isFullScreenModeEnabled: boolean = false;
  loggedInUsername: string = "";


  constructor(
    public router: Router,
    private readonly authService: AuthenticationService,
    @Inject(DOCUMENT) private document: any) {
  }

  ngOnInit(): void {
    this.elem = document.documentElement;
    this.loggedInUsername = this.authService.getUsername();

    if (this.currentTheme === 'DARK') {
      this.isDarkModeSelected = true;
    }
  }

  enterFullscreenMode() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
      this.isFullScreenModeEnabled = true;
    } 
  }

  closeFullscreenMode() {
    if(this.isFullScreenModeEnabled) {
      this.document.exitFullscreen();
      this.isFullScreenModeEnabled = false;
    }
  }

  changeTheme() {
    this.isDarkModeSelected = !this.isDarkModeSelected
    this.themeChanged.emit({
      changeToDarkMode: this.isDarkModeSelected
    });
  }
}
