import { TestBed } from '@angular/core/testing';

import { EsriSketchService } from './esri-sketch.service';

describe('EsriSketchService', () => {
  let service: EsriSketchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EsriSketchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
