import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareExamComponent } from './share-exam.component';

describe('ShareExamComponent', () => {
  let component: ShareExamComponent;
  let fixture: ComponentFixture<ShareExamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShareExamComponent]
    });
    fixture = TestBed.createComponent(ShareExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
