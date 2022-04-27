import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTimelineComponent } from './input-timeline.component';

describe('InputTimelineComponent', () => {
  let component: InputTimelineComponent;
  let fixture: ComponentFixture<InputTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputTimelineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
