import { Component, Input, OnInit } from '@angular/core';
import { MapObject } from '../../models/MapObject';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent {
  @Input() initializeMapObject!: MapObject;
  managementPestButtonName = 'Pesticide Management';
  deployPestButtonName = 'Deploy Pesticide';
  cancelSurveyButtonName = 'Cancel Survey';
  criticalOnly = false;
  deploymentMargin = 2;

  constructor() {}
  createSettingsMenu() {}
}
