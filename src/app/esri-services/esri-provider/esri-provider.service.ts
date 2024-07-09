import { Injectable } from '@angular/core';
import MapView from '@arcgis/core/views/MapView';
import esriMap from '@arcgis/core/Map';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';

@Injectable({
  providedIn: 'root',
})
export class EsriProviderService {
  private map!: esriMap;
  private view!: MapView;

  constructor() {}

  public getEsriMap() {
    return this.map;
  }

  public setEsriMap(map: esriMap) {
    this.map = map;
  }

  public getMapView() {
    return this.view;
  }

  public setMapView(view: MapView) {
    this.view = view;
  }

  public addLayerToMap(layer: GraphicsLayer) {
    this.map.add(layer);
  }
}
