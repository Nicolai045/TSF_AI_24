import { Component, Input, OnInit } from '@angular/core';
import { DroneObject } from '../../models/DroneObject';
import { MapObject } from '../../models/MapObject';
import { ConfirmationService, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-drone-controller',
  templateUrl: './drone-controller.component.html',
  styleUrl: './drone-controller.component.css',
})
export class DroneControllerComponent implements OnInit {
  @Input() mapObject!: MapObject;
  date!: Date;
  activeDrones: DroneObject[] = [];
  menuItems!: MenuItem[];

  constructor(private confirmationService: ConfirmationService) {}
  ngOnInit(): void {
    //this.drones = this.mapObject.drones;
    this.date = this.getCurrentDate();
    this.setMenu();
  }

  getCurrentDate(): Date {
    const currentDate = new Date(Date.now());
    return currentDate;
  }

  confirmDelete(event: Event, droneId: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you really want to delete the drone from the system?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.removeDroneFromMap(this.mapObject.drones, droneId);
      },
      reject: () => {
        console.log('');
      },
    });
  }

  removeDroneFromMap(drones: DroneObject[], droneId: number) {
    const droneWithId = drones.find((drone) => drone.id == droneId);
    if (droneWithId != null) {
      const index = drones.indexOf(droneWithId, 0);
      if (index > -1) {
        drones.splice(index, 1);
      }
    }
  }

  setMenu() {
    this.menuItems = [
      {
        label: 'Maintainance Scedule',
        icon: 'pi pi-wrench',
      },
      {
        label: 'Remove Drone',
        icon: 'pi pi-trash',
      },
    ];
  }

  removeDrone(droneId: number) {}
}
