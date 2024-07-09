import { TestBed } from '@angular/core/testing';

import { EsriProviderService } from './esri-provider.service';

describe('EsriProviderService', () => {
  let service: EsriProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EsriProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
