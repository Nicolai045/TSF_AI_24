import { AfterViewInit, Component, OnInit } from '@angular/core';
import MapView from '@arcgis/core/views/MapView';
import esriMap from '@arcgis/core/Map';
import esriConfig from '@arcgis/core/config';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import { EsriProviderService } from '../../esri-services/esri-provider/esri-provider.service';
import { EsriBasemapService } from '../../esri-services/esri-basemap/esri-basemap.service';
import { EsriSketchService } from '../../esri-services/esri-sketch/esri-sketch.service';
import { EsriSimpleGraphicService } from '../../esri-services/esri-simple-graphic/esri-simple-graphic.service';
import { SimpleGraphicType } from '../../models/SimpleGraphicTypes';

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrl: './esri-map.component.css',
})
export class EsriMapComponent implements OnInit, AfterViewInit {
  graphicsLayer!: GraphicsLayer;

  constructor(
    private esriProviderService: EsriProviderService,
    private basemapService: EsriBasemapService,
    private sketchService: EsriSketchService,
    private simpleGraphicsService: EsriSimpleGraphicService,
  ) {}
  ngAfterViewInit(): void {
    this.sketchService.addSketchTool();
  }
  async ngOnInit() {
    this.createMap();
    this.basemapService.addBaseMapGallery();
    this.simpleGraphicsService.createSimpleGraphicsLayer();
    this.simpleGraphicsService.createPestGraphicsLayer();

    //Test Purposes
    this.simpleGraphicsService.addPointToMap(10, 51, SimpleGraphicType.NORMAL);

    this.simpleGraphicsService.addPointToMap(
      10.000777,
      51.00096,
      SimpleGraphicType.PEST,
      'Mold',
      'Around this area is Mold, Please use: Fungicide 1 or 2',
    );
    this.simpleGraphicsService.addPointToMap(
      10.001388,
      50.99907,
      SimpleGraphicType.PEST,
      'Pest',
      'Around this area is Pest, Please use: Pesticide 2 or 3',
    );
    this.simpleGraphicsService.addPointToMap(
      9.999088,
      50.998899,
      SimpleGraphicType.PEST,
      'Other',
      'Around this area is Other, Please use: Herbicide 1',
    );
    this.simpleGraphicsService.addPointToMap(
      9.999041,
      50.999916,
      SimpleGraphicType.PEST,
      'Mold',
      'Around this area is Mold, Please use: Fungicide 1 or 2',
    );
  }

  createMap(): void {
    esriConfig.apiKey = '<Insert API-Key Here>';

    const map = new esriMap({
      basemap: 'arcgis/topographic',
    });

    const view = new MapView({
      container: 'viewDiv',
      map: map,
      zoom: 4,
      center: [10, 51],
    });

    this.esriProviderService.setEsriMap(map);
    this.esriProviderService.setMapView(view);
  }

  /*
  private registerClickEventHandler() {
    this.view.on('click', (event: __esri.ViewClickEvent) => {
      const native = event.native as PointerEvent;
      const hitTestResults = this.view.hitTest(event);
      console.log(hitTestResults);
    });
  }*/
}
