import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchlatermoviesComponent } from './watchlatermovies.component';

describe('WatchlatermoviesComponent', () => {
  let component: WatchlatermoviesComponent;
  let fixture: ComponentFixture<WatchlatermoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchlatermoviesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchlatermoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
