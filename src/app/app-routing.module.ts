import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginOrRegisterComponent } from './components/pages/login-or-register/login-or-register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login-or-register',
    pathMatch: 'full'
  },
  {
    path: 'login-or-register',
    component: LoginOrRegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
