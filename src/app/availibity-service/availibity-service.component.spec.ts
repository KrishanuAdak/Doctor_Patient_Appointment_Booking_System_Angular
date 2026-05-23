import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailibityServiceComponent } from './availibity-service.component';

describe('AvailibityServiceComponent', () => {
  let component: AvailibityServiceComponent;
  let fixture: ComponentFixture<AvailibityServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailibityServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvailibityServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
