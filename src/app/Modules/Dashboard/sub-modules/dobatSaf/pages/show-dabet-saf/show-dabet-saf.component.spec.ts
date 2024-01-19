import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDabetSafComponent } from './show-dabet-saf.component';

describe('ShowDabetSafComponent', () => {
  let component: ShowDabetSafComponent;
  let fixture: ComponentFixture<ShowDabetSafComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDabetSafComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowDabetSafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
