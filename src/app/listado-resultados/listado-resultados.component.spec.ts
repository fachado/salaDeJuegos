import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoResultadosComponent } from './listado-resultados.component';

describe('ListadoResultadosComponent', () => {
  let component: ListadoResultadosComponent;
  let fixture: ComponentFixture<ListadoResultadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoResultadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
