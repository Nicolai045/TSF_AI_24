import { Component } from '@angular/core';
import * as Leaflet from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent {
  managementPestButtonName = 'Pesticide Management';
  deployPestButtonName = 'Deploy Pesticide';
  cancelSurveyButtonName = 'Cancel Survey';

  options: Leaflet.MapOptions = {
    layers: getLayers(),
    zoom: 10,
    center: new Leaflet.LatLng(51.530147, 10.488932),
  };
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
