import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFlatsComponent } from './create-flats.component';

describe('CreateFlatsComponent', () => {
  let component: CreateFlatsComponent;
  let fixture: ComponentFixture<CreateFlatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateFlatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFlatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
