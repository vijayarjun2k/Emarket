import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolepopupComponent } from './rolepopup.component';

describe('RolepopupComponent', () => {
  let component: RolepopupComponent;
  let fixture: ComponentFixture<RolepopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolepopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RolepopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
