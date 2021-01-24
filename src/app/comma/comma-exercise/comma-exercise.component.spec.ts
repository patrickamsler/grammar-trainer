import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommaExerciseComponent } from './comma-exercise.component';

describe('CommaExerciseComponent', () => {
  let component: CommaExerciseComponent;
  let fixture: ComponentFixture<CommaExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommaExerciseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommaExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
