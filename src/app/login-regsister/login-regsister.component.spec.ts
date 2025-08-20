import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegsisterComponent } from './login-regsister.component';

describe('LoginRegsisterComponent', () => {
  let component: LoginRegsisterComponent;
  let fixture: ComponentFixture<LoginRegsisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginRegsisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginRegsisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
