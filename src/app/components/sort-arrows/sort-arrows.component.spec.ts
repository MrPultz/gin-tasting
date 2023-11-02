import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortArrowsComponent } from './sort-arrows.component';

describe('SortArrowsComponent', () => {
  let component: SortArrowsComponent;
  let fixture: ComponentFixture<SortArrowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortArrowsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortArrowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
