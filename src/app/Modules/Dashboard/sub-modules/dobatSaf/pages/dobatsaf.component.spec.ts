import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DobatSafComponent } from './dobatsaf.component';

describe('DobatsafComponent', () => {
  let component: DobatSafComponent;
  let fixture: ComponentFixture<DobatSafComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DobatSafComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DobatSafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
