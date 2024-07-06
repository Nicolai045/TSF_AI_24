import { Component, OnInit, output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MapObject } from '../../models/MapObject';
import { DroneObject } from '../../models/DroneObject';
import { DroneStatus } from '../../models/DroneStatus';

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

  currentIndex: number = 0;

  mapObjects: MapObject[] = [];

  settingsComponentsOpen = true;

  items: MenuItem[] = [];
  fields: MenuItem[] = [];
  menuItems: any;

  ngOnInit(): void {
    this.setMenuItems();
    const testDrones: DroneObject[] = [
      {
        name: 'Drone 1',
        id: 0,
        isActive: false,
        loadingState: 80,
        status: DroneStatus.ACTIVE,
      },
      {
        name: 'Drone 2',
        id: 1,
        isActive: false,
        loadingState: 15,
        status: DroneStatus.LOADING,
      },
      {
        name: 'Drone 3',
        id: 2,
        isActive: false,
        loadingState: 45,
        status: DroneStatus.RETURNING,
      },
    ];
    const mapOne: MapObject = { mapTitle: 'Field1', drones: testDrones };
    const mapTwo: MapObject = { mapTitle: 'Field2', drones: [] };
    const mapThree: MapObject = { mapTitle: 'Field3', drones: [] };
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

    this.menuItems = [
      {
        label: 'Maintainance Scedule',
        icon: 'pi pi-wrench',
      },
      {
        label: 'Other Settings',
        icon: 'pi pi-ellipsis-h',
      },
    ];
  }
}
