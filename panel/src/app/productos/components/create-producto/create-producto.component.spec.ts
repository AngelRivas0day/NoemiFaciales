import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductoComponent } from './create-producto.component';

describe('CreateEventComponent', () => {
  let component: CreateProductoComponent;
  let fixture: ComponentFixture<CreateProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
