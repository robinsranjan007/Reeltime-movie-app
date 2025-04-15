import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UppermidsectionComponent } from './uppermidsection.component';

describe('UppermidsectionComponent', () => {
  let component: UppermidsectionComponent;
  let fixture: ComponentFixture<UppermidsectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UppermidsectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UppermidsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
