import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalsDisplayComponent } from './renewals-display.component';

describe('RenewalsDisplayComponent', () => {
  let component: RenewalsDisplayComponent;
  let fixture: ComponentFixture<RenewalsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenewalsDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenewalsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
