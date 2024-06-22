import { TestBed } from '@angular/core/testing';

import { CrudMessageService } from './crud-message.service';

describe('CrudMessageService', () => {
  let service: CrudMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
