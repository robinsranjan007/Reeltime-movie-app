import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NowplayingComponent } from './nowplaying.component';

describe('NowplayingComponent', () => {
  let component: NowplayingComponent;
  let fixture: ComponentFixture<NowplayingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NowplayingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NowplayingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
