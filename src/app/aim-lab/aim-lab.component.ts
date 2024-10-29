import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-aim-lab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aim-lab.component.html',
  styleUrl: './aim-lab.component.scss'
})
export class AimLabComponent implements OnInit, OnDestroy {
  score: number = 0;
  time: number = 30; // Duración del juego en segundos
  circles: Array<{ id: number; top: number; left: number }> = [];
  intervalId: any;
  cursorPosition = { x: 0, y: 0 };

  ngOnInit(): void {
    this.startGame();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  startGame(): void {
    this.score = 0;
    this.circles = [];
    this.time = 30; // Reiniciar el tiempo
    this.generateCircles();
    this.intervalId = setInterval(() => {
      if (this.time > 0) {
        this.time--;
      } else {
        clearInterval(this.intervalId);
        this.endGame();
      }
    }, 1000);
  }

  generateCircles(): void {
    const generateCircle = () => {
      if (this.time > 0) {
        const circleId = Date.now(); // Un ID único basado en el tiempo
        const circle = {
          id: circleId,
          top: Math.random() * (window.innerHeight - 60), // Restar 60 para evitar que se salga de la pantalla
          left: Math.random() * (window.innerWidth - 60),
        };
        this.circles.push(circle);
        
        // Limitar a 3 círculos a la vez
        if (this.circles.length > 3) {
          this.removeCircle(this.circles[0].id); // Eliminar el círculo más antiguo
        }

        setTimeout(() => {
          this.removeCircle(circleId);
        }, 2000); // Cada círculo desaparece después de 2 segundos

        setTimeout(generateCircle, 500); // Generar un nuevo círculo cada medio segundo
      }
    };
    generateCircle();
  }

  removeCircle(id: number): void {
    this.circles = this.circles.filter(circle => circle.id !== id);
  }

  shoot(circleId: number): void {
    this.score++;
    this.removeCircle(circleId);
  }

  endGame(): void {
    Swal.fire({
      title: 'Juego Terminado',
      text: `Tu puntuación es: ${this.score}`,
      icon: 'success',
      confirmButtonText: 'Aceptar',
    });
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.cursorPosition.x = event.clientX; // Posición del mouse
    this.cursorPosition.y = event.clientY; // Posición del mouse
  }
}