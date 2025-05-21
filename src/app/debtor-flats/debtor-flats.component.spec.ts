import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtorFlatsComponent } from './debtor-flats.component';

describe('DebtorFlatsComponent', () => {
  let component: DebtorFlatsComponent;
  let fixture: ComponentFixture<DebtorFlatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DebtorFlatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebtorFlatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
