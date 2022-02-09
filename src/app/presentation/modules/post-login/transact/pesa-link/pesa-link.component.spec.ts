import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesaLinkComponent } from './pesa-link.component';

describe('PesaLinkComponent', () => {
  let component: PesaLinkComponent;
  let fixture: ComponentFixture<PesaLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PesaLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PesaLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
