import { TestBed } from '@angular/core/testing';

import { EsriSimpleGraphicService } from './esri-simple-graphic.service';

describe('EsriSimpleGraphicService', () => {
  let service: EsriSimpleGraphicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EsriSimpleGraphicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
