import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFlatModalComponent } from './edit-flat-modal.component';

describe('EditFlatModalComponent', () => {
  let component: EditFlatModalComponent;
  let fixture: ComponentFixture<EditFlatModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditFlatModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFlatModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
