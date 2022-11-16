import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideMenuComponent } from './components/general-components/side-menu/side-menu.component';
import { AngularMaterialModule } from './modules/angular-material-module';
import { ToolbarComponent } from './components/general-components/toolbar/toolbar.component';
import { LogoComponent } from './components/general-components/logo/logo.component';
import { LoginOrRegisterComponent } from './components/pages/login-or-register/login-or-register.component';
import { HomeComponent } from './components/pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    ToolbarComponent,
    LogoComponent,
    LoginOrRegisterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
