import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueUpdatesComponent } from './revenue-updates.component';

describe('RevenueUpdatesComponent', () => {
  let component: RevenueUpdatesComponent;
  let fixture: ComponentFixture<RevenueUpdatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevenueUpdatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevenueUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
