import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvsidenavbarComponent } from './tvsidenavbar.component';

describe('TvsidenavbarComponent', () => {
  let component: TvsidenavbarComponent;
  let fixture: ComponentFixture<TvsidenavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvsidenavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvsidenavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
