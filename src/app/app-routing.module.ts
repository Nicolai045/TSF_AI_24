import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginWindowComponent } from './components/login-window/login-window.component';
import { RegisterWindowComponent } from './components/register-window/register-window.component';
import { MainWindowComponent } from './components/main-window/main-window.component';

const routes: Routes = [
  { path: '', component: MainWindowComponent },
  { path: 'login', component: LoginWindowComponent },
  { path: 'register', component: RegisterWindowComponent },
  { path: 'main-window', component: MainWindowComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
