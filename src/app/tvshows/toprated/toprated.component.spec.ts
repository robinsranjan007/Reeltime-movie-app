import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopratedComponent } from './toprated.component';

describe('TopratedComponent', () => {
  let component: TopratedComponent;
  let fixture: ComponentFixture<TopratedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopratedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopratedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
