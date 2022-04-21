import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingTestComponent } from './rating-test.component';

describe('RatingTestComponent', () => {
  let component: RatingTestComponent;
  let fixture: ComponentFixture<RatingTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatingTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
