import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LowermidsectionComponent } from './lowermidsection.component';

describe('LowermidsectionComponent', () => {
  let component: LowermidsectionComponent;
  let fixture: ComponentFixture<LowermidsectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LowermidsectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LowermidsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
