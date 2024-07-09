import { Injectable } from '@angular/core';
import { EsriProviderService } from '../esri-provider/esri-provider.service';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import SketchViewModel from '@arcgis/core/widgets/Sketch/SketchViewModel';
import Sketch from '@arcgis/core/widgets/Sketch';
import Expand from '@arcgis/core/widgets/Expand';
import Polygon from '@arcgis/core/geometry/Polygon.js';
import { polygonSymbolSF } from '../../constantStore/esriSymbols';
import Graphic from '@arcgis/core/Graphic';
import e from 'express';

@Injectable({
  providedIn: 'root',
})
export class EsriSketchService {
  private readonly SKETCH_LAYER_ID = 'sketch-layer-1';
  private sketchTool!: Sketch;
  private sketchViewModel!: SketchViewModel;

  constructor(private esriProviderService: EsriProviderService) {}

  public addSketchTool() {
    const graphicsLayer = this.createGraphicsLayer();
    this.createSketchViewModel(graphicsLayer);
    this.createSketchTool(graphicsLayer);
    this.addEventListeners();
    this.addExpandToMap();
  }

  private createGraphicsLayer() {
    const graphicsLayer = new GraphicsLayer({
      id: this.SKETCH_LAYER_ID,
      elevationInfo: {
        mode: 'on-the-ground',
      },
    });
    this.esriProviderService.addLayerToMap(graphicsLayer);
    return graphicsLayer;
  }

  private createSketchViewModel(graphicsLayer: GraphicsLayer) {
    this.sketchViewModel = new SketchViewModel({
      layer: graphicsLayer,
      view: this.esriProviderService.getMapView(),
      polygonSymbol: polygonSymbolSF as any,
      defaultCreateOptions: {
        hasZ: true, // default value
      },
      defaultUpdateOptions: {
        enableZ: true, // default value
      },
    });
  }

  private createSketchTool(graphicsLayer: GraphicsLayer) {
    this.sketchTool = new Sketch({
      layer: graphicsLayer,
      view: this.esriProviderService.getMapView(),
      tooltipOptions: {
        enabled: true,
        visibleElements: {
          size: true,
          scale: true,
        },
      },
      visibleElements: {
        createTools: {
          circle: false,
          point: false,
          polyline: false,
        },
      },
    });
  }

  private addExpandToMap() {
    const sketchExpand = new Expand({
      expandIcon: 'rectangle-plus',
      expandTooltip: 'Draw Geometry',
      view: this.esriProviderService.getMapView(),
      content: this.sketchTool,
    });
    this.esriProviderService.getMapView().ui.add(sketchExpand, 'top-right');
    this.addExpandCloseEventListener(sketchExpand);
  }

  private addExpandCloseEventListener(expandWidget: Expand) {
    const expandContainer = expandWidget.container as HTMLElement;
    const toggleButton = expandContainer;
    console.log(toggleButton);

    this.esriProviderService.getMapView().on('key-down', (event) => {
      if (event.key == 'Escape') {
        this.sketchTool.cancel();
      }
    });
  }

  private addEventListeners() {
    this.sketchTool.on('create', (event) => {
      if (event.state == 'cancel') {
        return;
      }
      const map = this.esriProviderService.getEsriMap();
      const layer: GraphicsLayer = map.findLayerById(
        this.SKETCH_LAYER_ID,
      ) as any;
      layer.removeAll();
      if (event?.graphic?.geometry?.extent != null) {
        layer.add(this.createPolygonGraphic(event.graphic.geometry.extent));
      }
    });
  }

  private createPolygonGraphic(extent: __esri.Extent): Graphic {
    const polygon = Polygon.fromExtent(extent);
    return new Graphic({
      geometry: polygon,
      symbol: polygonSymbolSF,
    });
    /*
    view.on("click", function(evt) {
      const area = Polygon.fromExtent(view.extent);
      const graphic = new Graphic({
        geometry: area,
        symbol: { type: "simple-fill" }
      });
      view.graphics.add(graphic);
    });*/
  }
}
