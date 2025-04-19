import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvdetailsComponent } from './tvdetails.component';

describe('TvdetailsComponent', () => {
  let component: TvdetailsComponent;
  let fixture: ComponentFixture<TvdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
