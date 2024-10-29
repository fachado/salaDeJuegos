import { Component, OnInit } from '@angular/core';
import { ResultadosService } from '../resultados.service';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-resultados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.scss'
})
export class ResultadosComponent implements OnInit {
  resultados$: Observable<any[]> | undefined; // Inicializa como undefined

  constructor(private resultadosService: ResultadosService, private userService: UserService) {}

  ngOnInit(): void {
    const usuarioId = this.userService.getUserEmail(); // Obtén el ID del usuario
    if (usuarioId) {
      this.resultados$ = this.resultadosService.getResultadosPorUsuario(usuarioId);
    }
  }
}