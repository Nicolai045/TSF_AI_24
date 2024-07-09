import { Injectable } from '@angular/core';
import { EsriProviderService } from '../esri-provider/esri-provider.service';
import BasemapGallery from '@arcgis/core/widgets/BasemapGallery';
import Expand from '@arcgis/core/widgets/Expand';

@Injectable({
  providedIn: 'root',
})
export class EsriBasemapService {
  constructor(private esriProviderService: EsriProviderService) {}

  addBaseMapGallery() {
    const basemapGallery = new BasemapGallery({
      view: this.esriProviderService.getMapView(),
    });
    const basemapGalleryExpand = new Expand({
      expandIcon: 'analysis',
      expandTooltip: 'Change Baselayer',
      view: this.esriProviderService.getMapView(),
      content: basemapGallery,
    });
    this.esriProviderService
      .getMapView()
      .ui.add(basemapGalleryExpand, 'top-right');
  }
}
