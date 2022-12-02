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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './utils/interceptor/Interceptor';
import { AccountsComponent } from './components/pages/admin-pages/accounts/accounts.component';
import { BookingsComponent } from './components/pages/admin-pages/bookings/bookings.component';
import { LocationsComponent } from './components/pages/admin-pages/locations/locations.component';
import { ReviewsComponent } from './components/pages/admin-pages/reviews/reviews.component';
import { AccountDialogComponent } from './components/pages/admin-pages/accounts/account-dialog/account-dialog.component';
import { BookingDialogComponent } from './components/pages/admin-pages/bookings/booking-dialog/booking-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    ToolbarComponent,
    LogoComponent,
    LoginOrRegisterComponent,
    HomeComponent,
    AccountsComponent,
    BookingsComponent,
    LocationsComponent,
    ReviewsComponent,
    AccountDialogComponent,
    BookingDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
