import { Component, OnInit } from '@angular/core';
import { EncuestaService } from '../encuesta.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-respuestas-encuesta',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './respuestas-encuesta.component.html',
  styleUrl: './respuestas-encuesta.component.scss'
})
export class RespuestasEncuestaComponent implements OnInit {
  encuestas$: Observable<any[]> | any;

  constructor(private encuestaService: EncuestaService) {}

  ngOnInit(): void {
    this.encuestas$ = this.encuestaService.getEncuestas();
  }
}