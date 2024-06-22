import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FloatLabelModule } from 'primeng/floatlabel';
import { LoginWindowComponent } from './components/login-window/login-window.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from './environments/environments';
import { PasswordModule } from 'primeng/password';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const config: SocketIoConfig = { url: environment.url, options: {} };

import { FilterPipeModule } from 'ngx-filter-pipe';
import { MessageServiceService } from './services/message-service/message-service.service';
import { RegisterWindowComponent } from './components/register-window/register-window.component';
import { MainWindowComponent } from './components/main-window/main-window.component';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginWindowComponent,
    RegisterWindowComponent,
    MainWindowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    FormsModule,
    FloatLabelModule,
    FilterPipeModule,
    PasswordModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(),
    MessageServiceService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
