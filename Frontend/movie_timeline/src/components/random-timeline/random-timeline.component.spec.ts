import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomTimelineComponent } from './random-timeline.component';

describe('RandomTimelineComponent', () => {
  let component: RandomTimelineComponent;
  let fixture: ComponentFixture<RandomTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomTimelineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
