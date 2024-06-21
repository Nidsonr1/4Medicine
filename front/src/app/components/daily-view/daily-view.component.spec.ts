import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyViewComponent } from './daily-view.component';

describe('DailyViewComponent', () => {
  let component: DailyViewComponent;
  let fixture: ComponentFixture<DailyViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailyViewComponent]
    });
    fixture = TestBed.createComponent(DailyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
