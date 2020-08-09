import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadsubmissionsComponent } from './readsubmissions.component';

describe('ReadsubmissionsComponent', () => {
  let component: ReadsubmissionsComponent;
  let fixture: ComponentFixture<ReadsubmissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadsubmissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadsubmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
