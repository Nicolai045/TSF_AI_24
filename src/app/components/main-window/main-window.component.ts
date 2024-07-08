import { Component, OnInit, output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MapObject } from '../../models/MapObject';
import { DroneObject } from '../../models/DroneObject';
import { DroneStatus } from '../../models/DroneStatus';
import { OverviewObject } from '../../models/OverviewObject';
import { PesticideCategory } from '../../models/PesticideCategory';
import { PesticideObject } from '../../models/PesticideObject';
import { UserDataService } from '../../services/user-data/user-data.service';
import { Router } from '@angular/router';

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

  allPesticides!: PesticideCategory[];

  items: MenuItem[] = [];
  fields: MenuItem[] = [];

  constructor(
    private userDataService: UserDataService,
    private router: Router,
  ) {
    //EMPTY
  }

  ngOnInit(): void {
    this.setMenuItems();

    const pesticide: PesticideObject = {
      name: 'Pesticide1',
      id: 1,
      stockValue: '60',
      allowedForField: [1, 2],
    };
    const pesticide2: PesticideObject = {
      name: 'Pesticide1',
      id: 2,
      stockValue: '60',
      allowedForField: [1, 2],
    };
    const pesticide3: PesticideObject = {
      name: 'Pesticide1',
      id: 3,
      stockValue: '60',
      allowedForField: [1, 2],
    };

    const pesticide4: PesticideObject = {
      name: 'Herbicide 1',
      id: 4,
      stockValue: '60',
      allowedForField: [1, 2],
    };
    const pesticide5: PesticideObject = {
      name: 'Herbicide 2',
      id: 5,
      stockValue: '60',
      allowedForField: [1, 2],
    };
    const pesticide6: PesticideObject = {
      name: 'Herbicide 3',
      id: 6,
      stockValue: '60',
      allowedForField: [1, 2],
    };

    const testPesticides: PesticideCategory = {
      name: 'Pesticide',
      id: 0,
      pesticides: [pesticide, pesticide2, pesticide3],
    };

    const testPesticides2: PesticideCategory = {
      name: 'Herbicide',
      id: 1,
      pesticides: [pesticide4, pesticide5, pesticide6],
    };

    this.allPesticides = [testPesticides, testPesticides2];

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
    const mapOne: MapObject = {
      fieldId: 1,
      mapTitle: 'Field1',
      drones: testDrones,
    };
    const mapTwo: MapObject = { fieldId: 2, mapTitle: 'Field2', drones: [] };
    const mapThree: MapObject = { fieldId: 3, mapTitle: 'Field3', drones: [] };
    this.mapObjects = [mapOne, mapTwo, mapThree];
  }

  maximizeMap() {
    this.settingsComponentsOpen = !this.settingsComponentsOpen;
  }

  setUserName() {
    const email = this.userDataService.getCurrentUserMail();
    if (email != null && email.length > 0) {
      this.userName = email;
    }
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
      {
        label: 'Widgets',
        icon: 'pi pi-objects-column',
        items: [
          {
            label: 'Weather',
            icon: 'pi pi-times',
          },
          {
            label: 'Pesticide Controller',
            icon: 'pi pi-check',
          },
          {
            label: 'Drone Controller',
            icon: 'pi pi-check',
          },
        ],
      },
      {
        label: 'Help',
        icon: 'pi pi-info-circle',
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

  signOut() {
    this.router.navigateByUrl('/login');
  }
}
