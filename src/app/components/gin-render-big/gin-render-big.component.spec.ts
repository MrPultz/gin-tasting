import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinRenderBigComponent } from './gin-render-big.component';

describe('GinRenderBigComponent', () => {
  let component: GinRenderBigComponent;
  let fixture: ComponentFixture<GinRenderBigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GinRenderBigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GinRenderBigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
