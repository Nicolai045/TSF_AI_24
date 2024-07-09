import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesticideManagerComponent } from './pesticide-manager.component';

describe('PesticideManagerComponent', () => {
  let component: PesticideManagerComponent;
  let fixture: ComponentFixture<PesticideManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PesticideManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PesticideManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
