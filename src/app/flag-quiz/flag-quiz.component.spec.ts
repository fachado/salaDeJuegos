import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlagQuizComponent } from './flag-quiz.component';

describe('FlagQuizComponent', () => {
  let component: FlagQuizComponent;
  let fixture: ComponentFixture<FlagQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlagQuizComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlagQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
