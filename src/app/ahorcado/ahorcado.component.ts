import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HomeComponent } from "../home/home.component";
import { LayoutComponent } from '../layout/layout.component';

import Swal from 'sweetalert2';
import { UserService } from '../user.service';
import { ResultadosService } from '../resultados.service';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [CommonModule, HomeComponent, LayoutComponent,],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.scss'
  
})
export class AhorcadoComponent {
  palabras: string[] = ['ANGULAR', 'REACT', 'VUE', 'JAVASCRIPT', 'HTML', 'CSS', 'NODEJS', 'PYTHON', 'JAVA', 'SWIFT'];
  palabra = '';
  palabraMostrada: string[] = [];
  intentosRestantes = 6;
  letrasDisponibles = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  letrasUsadas: string[] = [];
  mensaje = '';
  score = 0; // Inicializa tu puntuación


  constructor(private resultadosService: ResultadosService, private userService: UserService,  )
{
    this.inicializarJuego();
    
  }

  ngAfterViewInit() {
    this.dibujarBase();
  }

  inicializarJuego() {
    this.palabra = this.elegirPalabraAleatoria();
    this.palabraMostrada = Array(this.palabra.length).fill('_');
    this.intentosRestantes = 6;
    this.letrasUsadas = [];
    this.mensaje = '';
    this.score = 0; // Reinicia la puntuación al iniciar el juego

  }

  elegirPalabraAleatoria(): string {
    const indiceAleatorio = Math.floor(Math.random() * this.palabras.length);
    return this.palabras[indiceAleatorio];
  }

  verificarLetra(letra: string) {
    if (this.letrasUsadas.includes(letra)) return; // Ignorar si la letra ya fue usada

    this.letrasUsadas.push(letra);

    if (this.palabra.includes(letra)) {
      // Mostrar las letras adivinadas
      for (let i = 0; i < this.palabra.length; i++) {
        if (this.palabra[i] === letra) {
          this.palabraMostrada[i] = letra;
          this.score += 10; // Aumentar puntuación por adivinanza correcta
        }
      }

      // Verificar si ganó
      if (!this.palabraMostrada.includes('_')) {
        this.mensaje = '¡Ganaste!';
        this.guardarResultado(); // Guardar resultado al ganar
        this.mostrarResultado('¡Ganaste!', '¡Felicidades! Tu puntuación es: ' + this.score);
        this.limpiarAhorcado();
      }
    } else {
      // Reducir intentos si no adivinó
      this.intentosRestantes--;
      this.dibujarAhorcado(this.intentosRestantes); // Llamar a la función de dibujo

      if (this.intentosRestantes === 0) {
        this.mensaje = '¡Perdiste! La palabra era ' + this.palabra;
        this.guardarResultado(); // Guardar resultado al perder
        this.mostrarResultado('¡Perdiste!', 'La palabra era: ' + this.palabra + '. Tu puntuación es: ' + this.score);
        this.limpiarAhorcado();
      }
    }
  }

  mostrarResultado(titulo: string, texto: string) {
    Swal.fire({
      title: titulo,
      text: texto,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Jugar de nuevo',
      cancelButtonText: 'Salir',
    }).then((result) => {
      if (result.isConfirmed) {
        this.inicializarJuego(); // Reiniciar juego si el usuario quiere jugar de nuevo
      } else {
        // Aquí puedes agregar lógica si el usuario elige salir
        console.log('El usuario ha decidido salir del juego.');
      }
    });
  }

  guardarResultado(): void {
    const email = this.userService.getUserEmail(); // Obtener el email del usuario

    if (email) { // Solo continuar si email no es null
      this.resultadosService.guardarResultado(email, 'Ahorcado', this.score).then(() => {
        console.log('Resultado guardado exitosamente');
      }).catch((error) => {
        console.error('Error al guardar el resultado:', error);
        Swal.fire({
          title: 'Error',
          text: 'Error al guardar el resultado. Intenta de nuevo más tarde.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      });
    } else {
      console.error('No se pudo obtener el email del usuario.');
      Swal.fire({
        title: 'Error',
        text: 'No se pudo obtener el email del usuario. Asegúrate de que estás autenticado.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  dibujarBase() {
    const canvas = document.getElementById('canvasAhorcado') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'black';

    // Base
    ctx.beginPath();
    ctx.moveTo(40, 380); // Base
    ctx.lineTo(280, 380);
    ctx.moveTo(150, 380);
    ctx.lineTo(150, 60);
    ctx.moveTo(150, 60);
    ctx.lineTo(320, 60);
    ctx.moveTo(320, 60);
    ctx.lineTo(320, 120); // Cuerda
    ctx.stroke();
  }

  dibujarAhorcado(intentosUsados: number) {
    const canvas = document.getElementById('canvasAhorcado') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';

    switch (intentosUsados) {
      case 5: // Cabeza
        ctx.beginPath();
        ctx.arc(320, 140, 20, 0, Math.PI * 2);
        ctx.stroke();
        break;
      case 4: // Cuerpo
        ctx.beginPath();
        ctx.moveTo(320, 160);
        ctx.lineTo(320, 240);
        ctx.stroke();
        break;
      case 3: // Brazo izquierdo
        ctx.beginPath();
        ctx.moveTo(320, 180);
        ctx.lineTo(290, 210);
        ctx.stroke();
        break;
      case 2: // Brazo derecho
        ctx.beginPath();
        ctx.moveTo(320, 180);
        ctx.lineTo(350, 210);
        ctx.stroke();
        break;
      case 1: // Pierna izquierda
        ctx.beginPath();
        ctx.moveTo(320, 240);
        ctx.lineTo(290, 300);
        ctx.stroke();
        break;
      case 0: // Pierna derecha
        ctx.beginPath();
        ctx.moveTo(320, 240);
        ctx.lineTo(350, 300);
        ctx.stroke();
        break;
    }
  }

  limpiarAhorcado() {
    const canvas = document.getElementById('canvasAhorcado') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
  
    // Borrar solo el área del ahorcado
    ctx.clearRect(290, 120, 60, 200); // Borrar un rectángulo alrededor de la cabeza, cuerpo, brazos y piernas
  }
}