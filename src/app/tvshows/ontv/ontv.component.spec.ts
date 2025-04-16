import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OntvComponent } from './ontv.component';

describe('OntvComponent', () => {
  let component: OntvComponent;
  let fixture: ComponentFixture<OntvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OntvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OntvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
