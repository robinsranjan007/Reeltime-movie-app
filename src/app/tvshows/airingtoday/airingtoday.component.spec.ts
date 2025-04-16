import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiringtodayComponent } from './airingtoday.component';

describe('AiringtodayComponent', () => {
  let component: AiringtodayComponent;
  let fixture: ComponentFixture<AiringtodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiringtodayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiringtodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
