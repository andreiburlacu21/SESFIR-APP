import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})

export class SideMenuComponent implements OnInit {
  @Input() isOpened: boolean = false;
  @Output() themeChanged = new EventEmitter<{ changeToDarkMode: boolean }>();
  isDarkModeSelected: boolean = false;

  constructor(public router: Router) { }

  ngOnInit(): void { }

  changeTheme() {
    this.isDarkModeSelected = !this.isDarkModeSelected
    this.themeChanged.emit({
      changeToDarkMode: this.isDarkModeSelected
    });
  }

  logout() {
    // TODO: logout
  }
}
