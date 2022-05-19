import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateFormatComponent } from './template-format.component';

describe('TemplateFormatComponent', () => {
  let component: TemplateFormatComponent;
  let fixture: ComponentFixture<TemplateFormatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateFormatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
