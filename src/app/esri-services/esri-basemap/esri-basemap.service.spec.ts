import { TestBed } from '@angular/core/testing';

import { EsriBasemapService } from './esri-basemap.service';

describe('EsriBasemapService', () => {
  let service: EsriBasemapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EsriBasemapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
