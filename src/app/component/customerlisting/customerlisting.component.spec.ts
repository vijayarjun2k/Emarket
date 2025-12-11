import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerlistingComponent } from './customerlisting.component';

describe('CustomerlistingComponent', () => {
  let component: CustomerlistingComponent;
  let fixture: ComponentFixture<CustomerlistingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerlistingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerlistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
