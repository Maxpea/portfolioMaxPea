import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyersParisLeafletComponent } from './loyers-paris-leaflet.component';

describe('LoyersParisLeafletComponent', () => {
  let component: LoyersParisLeafletComponent;
  let fixture: ComponentFixture<LoyersParisLeafletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoyersParisLeafletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyersParisLeafletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
