import { Component, OnInit } from '@angular/core';
import { EncuestaService } from '../encuesta.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-encuesta',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.scss'
})
export class EncuestaComponent implements OnInit {
  user: any = null;

  encuestaForm!: FormGroup;
  email !:any ;
  preguntas: string[] = [
    '¿Cuál es tu color favorito?',
    '¿Qué tipo de música prefieres?',
    '¿Cuál es tu deporte favorito?',
    // Agrega más preguntas según sea necesario
  ];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private encuestaService: EncuestaService, // Asegúrate de inyectar el servicio
    private router: Router,
    private auth: Auth
  ) {}

  ngOnInit(): void {
        // Obtener el usuario autenticado

      // end of ngOnInit
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          this.user = user;
        } else {
          this.router.navigate(['/login']);
        }
      });
    this.encuestaForm = this.fb.group({
      nombre: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      respuesta1: ['', Validators.required],
      respuesta2: ['', Validators.required], // Asegúrate de que este campo sea requerido
      accion: [false],
      aventura: [false],
      estrategia: [false],
    });
  }
  onSubmit(): void {
    if (this.encuestaForm.valid) {
      
      this.email = this.userService.getUserEmail();
      console.log(this.email);
      
      const usuarioEmail = this.userService.getUserEmail(); // Asegúrate de tener el usuario

      const encuestaData = {
        ...this.encuestaForm.value,
        usuarioEmail,
        fecha: new Date(),
      };
      this.encuestaService.saveEncuesta(encuestaData).then(() => {
        console.log('Encuesta guardada con éxito');
      }).catch(error => {
        console.error('Error guardando encuesta:', error);
      });
    }
  }
}