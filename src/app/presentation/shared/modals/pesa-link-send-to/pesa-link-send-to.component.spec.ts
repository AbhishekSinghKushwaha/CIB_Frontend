import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesaLinkSendToComponent } from './pesa-link-send-to.component';

describe('PesaLinkSendToComponent', () => {
  let component: PesaLinkSendToComponent;
  let fixture: ComponentFixture<PesaLinkSendToComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PesaLinkSendToComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PesaLinkSendToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
