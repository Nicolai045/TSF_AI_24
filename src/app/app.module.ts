import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { TieredMenuModule } from 'primeng/tieredmenu';

const config: SocketIoConfig = { url: environment.url, options: {} };

import { FilterPipeModule } from 'ngx-filter-pipe';
import { MessageServiceService } from './services/message-service/message-service.service';
import { RegisterWindowComponent } from './components/register-window/register-window.component';
import { MainWindowComponent } from './components/main-window/main-window.component';
import { provideHttpClient } from '@angular/common/http';
import { MenubarModule } from 'primeng/menubar';
import { Menu, MenuModule } from 'primeng/menu';
import { MapComponent } from './components/map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Panel, PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { DroneControllerComponent } from './components/drone-controller/drone-controller.component';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { ListboxModule } from 'primeng/listbox';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    LoginWindowComponent,
    RegisterWindowComponent,
    MainWindowComponent,
    MapComponent,
    DroneControllerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    ConfirmDialogModule,
    InputGroupAddonModule,
    ListboxModule,
    InputGroupModule,
    CardModule,
    ToolbarModule,
    TooltipModule,
    ToggleButtonModule,
    InputNumberModule,
    CalendarModule,
    MenuModule,
    InputTextModule,
    TabViewModule,
    FormsModule,
    TieredMenuModule,
    FloatLabelModule,
    LeafletModule,
    MenubarModule,
    PanelModule,
    FilterPipeModule,
    PasswordModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(),
    MessageServiceService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
