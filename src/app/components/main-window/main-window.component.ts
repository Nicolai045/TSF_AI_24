import { Component, OnInit, output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MapObject } from '../../models/MapObject';

@Component({
  selector: 'app-main-window',
  templateUrl: './main-window.component.html',
  styleUrl: './main-window.component.css',
})
export class MainWindowComponent implements OnInit {
  userName = 'Test1234';

  managementPestButtonName = 'Pesticide Management';
  deployPestButtonName = 'Deploy Pesticide';
  cancelSurveyButtonName = 'Cancel Survey';

  mapObjects: MapObject[] = [];

  settingsComponentsOpen = true;

  items: MenuItem[] = [];
  fields: MenuItem[] = [];

  ngOnInit(): void {
    const mapOne: MapObject = { mapTitle: 'Field1' };
    const mapTwo: MapObject = { mapTitle: 'Field2' };
    const mapThree: MapObject = { mapTitle: 'Field3' };
    this.mapObjects = [mapOne, mapTwo, mapThree];
  }

  maximizeMap() {
    this.settingsComponentsOpen = !this.settingsComponentsOpen;
  }

  setMenuItems() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
      },
      {
        label: 'Options',
        icon: 'pi pi-cog',
      },
    ];

    this.fields = [
      {
        label: 'Field 1',
      },
      {
        label: 'Field 2',
      },
      {
        label: 'Field 3',
      },
      {
        label: 'Field 4',
      },
      {
        label: 'Field 5',
      },
      {
        label: 'Field 6',
      },
      {
        label: 'Field 7',
      },
    ];
  }
}
