import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDabetSafComponent } from './new-dabet-saf.component';

describe('NewDabetSafComponent', () => {
  let component: NewDabetSafComponent;
  let fixture: ComponentFixture<NewDabetSafComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDabetSafComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewDabetSafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
