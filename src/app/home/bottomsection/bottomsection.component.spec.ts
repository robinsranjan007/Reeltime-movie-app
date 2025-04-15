import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomsectionComponent } from './bottomsection.component';

describe('BottomsectionComponent', () => {
  let component: BottomsectionComponent;
  let fixture: ComponentFixture<BottomsectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomsectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottomsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
