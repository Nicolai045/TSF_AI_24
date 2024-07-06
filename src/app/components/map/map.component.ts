import { Component, Input, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import { MapObject } from '../../models/MapObject';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements OnInit {
  @Input() initializeMapObject!: MapObject;

  managementPestButtonName = 'Pesticide Management';
  deployPestButtonName = 'Deploy Pesticide';
  cancelSurveyButtonName = 'Cancel Survey';
  criticalOnly = false;
  deploymentMargin = 2;

  constructor() {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  options: Leaflet.MapOptions = {
    layers: getLayers(),
    zoom: 10,
    center: new Leaflet.LatLng(51.530147, 10.488932),
  };

  createSettingsMenu() {}
}

export const getLayers = (): Leaflet.Layer[] => {
  return [
    new Leaflet.TileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '&copy; OpenStreetMap contributors',
      } as Leaflet.TileLayerOptions,
    ),
  ] as Leaflet.Layer[];
};
