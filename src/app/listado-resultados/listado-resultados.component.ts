import { Component, OnInit } from '@angular/core';
import { ResultadosService } from '../resultados.service';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-listado-resultados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listado-resultados.component.html',
  styleUrls: ['./listado-resultados.component.scss' ] // Corrige 'styleUrl' a 'styleUrls'
})
export class ListadoResultadosComponent implements OnInit {
  resultados$: Observable<any[]> | undefined; // Inicializa como undefined
  juegoSeleccionado: string = "Mayor-Menor"; // Inicializamos con un juego por defecto

  constructor(private resultadosService: ResultadosService) {}

  ngOnInit(): void {
    this.obtenerResultados();
  }

  seleccionarJuego(juego: string): void {
    this.juegoSeleccionado = juego;
    this.obtenerResultados();
  }

  obtenerResultados(): void {
    this.resultados$ = this.resultadosService.getResultados().pipe(
      map(resultados => 
        resultados
          .filter(resultado => resultado.juego === this.juegoSeleccionado)
          .sort((a, b) => b.puntaje - a.puntaje) // Ordenar de mayor a menor
      )
    );
  }
}