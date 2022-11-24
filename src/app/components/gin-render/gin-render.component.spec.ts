import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinRenderComponent } from './gin-render.component';

describe('GinRenderComponent', () => {
  let component: GinRenderComponent;
  let fixture: ComponentFixture<GinRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GinRenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GinRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
