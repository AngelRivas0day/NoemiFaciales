import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServicioComponent } from './create-servicio.component';

describe('CreateServicioComponent', () => {
  let component: CreateServicioComponent;
  let fixture: ComponentFixture<CreateServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
