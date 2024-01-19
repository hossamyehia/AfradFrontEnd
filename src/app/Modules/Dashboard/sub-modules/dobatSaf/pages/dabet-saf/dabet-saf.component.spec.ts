import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DabetSafComponent } from './dabet-saf.component';

describe('DabetSafComponent', () => {
  let component: DabetSafComponent;
  let fixture: ComponentFixture<DabetSafComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DabetSafComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DabetSafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
