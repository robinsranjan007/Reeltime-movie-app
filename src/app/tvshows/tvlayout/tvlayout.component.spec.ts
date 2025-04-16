import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvlayoutComponent } from './tvlayout.component';

describe('TvlayoutComponent', () => {
  let component: TvlayoutComponent;
  let fixture: ComponentFixture<TvlayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvlayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
