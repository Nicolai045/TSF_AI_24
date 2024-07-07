import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesticideControllerComponent } from './pesticide-controller.component';

describe('PesticideControllerComponent', () => {
  let component: PesticideControllerComponent;
  let fixture: ComponentFixture<PesticideControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PesticideControllerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PesticideControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
