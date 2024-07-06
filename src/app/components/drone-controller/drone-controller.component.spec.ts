import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DroneControllerComponent } from './drone-controller.component';

describe('DroneControllerComponent', () => {
  let component: DroneControllerComponent;
  let fixture: ComponentFixture<DroneControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DroneControllerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DroneControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
