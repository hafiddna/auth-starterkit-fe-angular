import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearlyBreakupComponent } from './yearly-breakup.component';

describe('YearlyBreakupComponent', () => {
  let component: YearlyBreakupComponent;
  let fixture: ComponentFixture<YearlyBreakupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YearlyBreakupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YearlyBreakupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
