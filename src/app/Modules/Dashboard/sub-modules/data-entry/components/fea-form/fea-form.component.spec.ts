import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaFormComponent } from './fea-form.component';

describe('FeaFormComponent', () => {
  let component: FeaFormComponent;
  let fixture: ComponentFixture<FeaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
