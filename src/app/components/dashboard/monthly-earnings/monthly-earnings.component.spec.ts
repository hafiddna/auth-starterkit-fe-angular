import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyEarningsComponent } from './monthly-earnings.component';

describe('MonthlyEarningsComponent', () => {
  let component: MonthlyEarningsComponent;
  let fixture: ComponentFixture<MonthlyEarningsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyEarningsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyEarningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
