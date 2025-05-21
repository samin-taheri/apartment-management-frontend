import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseFlatsComponent } from './browse-flats.component';

describe('BrowseFlatsComponent', () => {
  let component: BrowseFlatsComponent;
  let fixture: ComponentFixture<BrowseFlatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrowseFlatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowseFlatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
