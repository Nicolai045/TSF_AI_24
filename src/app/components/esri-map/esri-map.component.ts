import { Component, OnInit } from '@angular/core';
import MapView from '@arcgis/core/views/MapView';
import esriMap from '@arcgis/core/Map';
import esriConfig from '@arcgis/core/config';
import BasemapGallery from '@arcgis/core/widgets/BasemapGallery';
import Expand from '@arcgis/core/widgets/Expand.js';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Graphic from '@arcgis/core/Graphic';
import { pointCIMSymbol } from '../../constantStore/esriSymbols';
import CIMSymbol from '@arcgis/core/symbols/CIMSymbol.js';

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrl: './esri-map.component.css',
})
export class EsriMapComponent implements OnInit {
  map!: esriMap;
  view!: MapView;
  graphicsLayer!: GraphicsLayer;

  async ngOnInit() {
    this.createMap();
    this.addBaseMapGallery();
    this.createGraphicsLayer();

    this.addPointToMap(10, 51);
  }

  createMap(): void {
    esriConfig.apiKey = '';

    this.map = new esriMap({
      basemap: 'arcgis/topographic',
    });

    this.view = new MapView({
      container: 'viewDiv',
      map: this.map,
      zoom: 4,
      center: [10, 51],
    });
  }

  addBaseMapGallery() {
    const basemapGallery = new BasemapGallery({
      view: this.view,
    });
    const basemapGalleryExpand = new Expand({
      expandIcon: 'analysis', // see https://developers.arcgis.com/calcite-design-system/icons/
      expandTooltip: 'Change Baselayer',
      view: this.view,
      content: basemapGallery,
    });
    this.view.ui.add(basemapGalleryExpand, 'top-right');
  }

  addPointToMap(xValue: number, yValue: number) {
    const point = {
      type: 'point',
      longitude: xValue,
      latitude: yValue,
    };

    const simpleMarkerSymbol = {
      type: 'simple-marker',
      color: [226, 119, 40],
      outline: {
        color: [255, 255, 255],
        width: 1,
      },
    };
    //CIMSymbol.fromJSON(pointCIMSymbol)
    const cimSymbol = new CIMSymbol({
      data: {
        type: 'CIMSymbolReference',
        symbol: pointCIMSymbol as any,
      },
    });
    const pointGraphic = new Graphic({
      geometry: point as any,
      symbol: cimSymbol,
      attributes: {
        Name: 'Field',
        Description: `Field Located in this location [${xValue}, ${yValue}]`,
      },
      popupTemplate: { title: '{Name}', content: '{Description}' },
    });

    this.graphicsLayer.add(pointGraphic);
  }

  createGraphicsLayer() {
    this.graphicsLayer = new GraphicsLayer();
    this.map.add(this.graphicsLayer);
  }
}
