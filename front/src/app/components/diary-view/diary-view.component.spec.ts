import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaryViewComponent } from './diary-view.component';

describe('DiaryViewComponent', () => {
  let component: DiaryViewComponent;
  let fixture: ComponentFixture<DiaryViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiaryViewComponent]
    });
    fixture = TestBed.createComponent(DiaryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
