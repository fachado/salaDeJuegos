import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AimLabComponent } from './aim-lab.component';

describe('AimLabComponent', () => {
  let component: AimLabComponent;
  let fixture: ComponentFixture<AimLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AimLabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AimLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
