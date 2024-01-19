import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaPageComponent } from './fea-page.component';

describe('FeaPageComponent', () => {
  let component: FeaPageComponent;
  let fixture: ComponentFixture<FeaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
