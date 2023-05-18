import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinEventCardComponent } from './gin-event-card.component';

describe('GinEventCardComponent', () => {
  let component: GinEventCardComponent;
  let fixture: ComponentFixture<GinEventCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GinEventCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GinEventCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
