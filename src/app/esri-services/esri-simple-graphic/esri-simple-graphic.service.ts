import { Injectable } from '@angular/core';
import CIMSymbol from '@arcgis/core/symbols/CIMSymbol';
import {
  pesticideSymbol,
  pointCIMSymbol,
} from '../../constantStore/esriSymbols';
import { EsriProviderService } from '../esri-provider/esri-provider.service';
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import { SimpleGraphicType } from '../../models/SimpleGraphicTypes';

@Injectable({
  providedIn: 'root',
})
export class EsriSimpleGraphicService {
  private readonly SIMPLE_GRAPHIC_LAYER = 'simple-graphic-layer-1';
  private readonly PEST_GRAPHICS_LAYER = 'pest-grapihc-layer-1';

  constructor(private esriProviderService: EsriProviderService) {}

  public addPointToMap(
    xValue: number,
    yValue: number,
    type: SimpleGraphicType,
    popUpTitle?: string,
    popUpContent?: string,
  ) {
    const graphic = this.createGraphic(
      xValue,
      yValue,
      type,
      popUpTitle,
      popUpContent,
    );
    this.addGraphicToLayer(graphic, type);
  }

  public createSimpleGraphicsLayer() {
    const graphicsLayer = new GraphicsLayer({
      id: this.SIMPLE_GRAPHIC_LAYER,
      elevationInfo: {
        mode: 'on-the-ground',
      },
    });
    this.esriProviderService.addLayerToMap(graphicsLayer);
  }

  public createPestGraphicsLayer() {
    const graphicsLayer = new GraphicsLayer({
      id: this.PEST_GRAPHICS_LAYER,
      elevationInfo: {
        mode: 'on-the-ground',
      },
    });
    this.esriProviderService.addLayerToMap(graphicsLayer);
  }

  private addGraphicToLayer(graphic: Graphic, type: SimpleGraphicType) {
    const layer: GraphicsLayer = this.esriProviderService
      .getEsriMap()
      .findLayerById(this.getLayerIdForType(type)) as any;
    if (layer != null) {
      layer.add(graphic);
    }
  }

  private createPoint(xValue: number, yValue: number) {
    return {
      type: 'point',
      longitude: xValue,
      latitude: yValue,
    };
  }

  private createCIMSymbol(symbol: any) {
    return new CIMSymbol({
      data: {
        type: 'CIMSymbolReference',
        symbol: symbol,
      },
    });
  }

  private createGraphic(
    xValue: number,
    yValue: number,
    type: SimpleGraphicType,
    popUpTitle?: string,
    popUpContent?: string,
  ) {
    const pointGraphic = new Graphic({
      geometry: this.createPoint(xValue, yValue) as any,
      symbol: this.getSymbolForType(type),
      attributes: {
        Name: popUpTitle ? popUpTitle : 'Field',
        Description: popUpContent
          ? popUpContent
          : `Field Located in this location [${xValue}, ${yValue}]`,
      },
      popupTemplate: { title: '{Name}', content: '{Description}' },
    });
    return pointGraphic;
  }

  private getSymbolForType(type: SimpleGraphicType) {
    switch (type) {
      case SimpleGraphicType.NORMAL:
        return this.createCIMSymbol(pointCIMSymbol);
      case SimpleGraphicType.PEST:
        return this.createCIMSymbol(pesticideSymbol);
    }
  }

  private getLayerIdForType(type: SimpleGraphicType) {
    switch (type) {
      case SimpleGraphicType.NORMAL:
        return this.SIMPLE_GRAPHIC_LAYER;
      case SimpleGraphicType.PEST:
        return this.PEST_GRAPHICS_LAYER;
    }
  }
}
