import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FlagQuizService } from '../flag-quiz.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ResultadosService } from '../resultados.service';
@Component({
  selector: 'app-flag-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './flag-quiz.component.html',
  styleUrls: ['./flag-quiz.component.scss'],
})
export class FlagQuizComponent implements OnInit {
  user: any = null;
  listOfCountries: any = [];
  listOfQuestions: any = [];
  victory: boolean = false;
  activeGame: boolean = false;
  gameOver: boolean = false;
  gameOverText: string = '¡PERDISTE!';
  score: number = 0;
  attempts: number = 3; // Intentos por pregunta
  currentQuestion: any = null;
  loadedQuestions: boolean = false;
  currentIndex: number = 0;
  correctAnswer: boolean = false;
  wrongAnswer: boolean = false;

  constructor(
    private router: Router,
    private apiPaises: FlagQuizService,
    private resultadosService: ResultadosService, // Inyectar el servicio de resultados
    private userService: UserService, // Inyectar el servicio de usuario

  ) {
    this.loadCountries();
  }

  async ngOnInit(): Promise<void> {

    await this.loadCountries();
    this.startGame();
  }

  private async loadCountries() {
    const paises = await this.apiPaises.getPaises();
    this.listOfCountries = paises.map((country: any) => ({
      name: country.translations.spa.official,
      flag: country.flags.png,
    }));
  }

  startGame() {
    this.generateQuestions();
    this.currentQuestion = this.listOfQuestions[this.currentIndex];
    this.activeGame = true;
    console.log('Juego iniciado: Preguntados');
  }

  generateQuestions() {
    this.listOfCountries.sort(() => Math.random() - 0.5);
    this.listOfQuestions = this.listOfCountries.slice(0, 10).map((country: any) => {
      const options = this.generateOptions(country.name);
      return {
        answer: country.name,
        options: options,
        flag: country.flag,
      };
    });
    this.loadedQuestions = true;
  }

  private generateOptions(correctAnswer: string): string[] {
    const options = new Set([correctAnswer]);
    while (options.size < 4) {
      const randomCountry = this.listOfCountries[this.generateRandomNumber()].name;
      options.add(randomCountry);
    }
    return Array.from(options).sort(() => Math.random() - 0.5);
  }

  generateRandomNumber(): number {
    return Math.floor(Math.random() * this.listOfCountries.length);
  }

  play(option: string, event: Event) {
    if (this.activeGame) {
      const btn = <HTMLButtonElement>event.target;
      btn.disabled = true;
  
      // Verificamos si la opción elegida es la correcta
      if (option === this.currentQuestion.answer) {
        this.score++;
        this.correctAnswer = true;
        setTimeout(() => this.correctAnswer = false, 300);
        console.log('¡Adivinaste!', 'Preguntados');
      } else {
        this.wrongAnswer = true;
        setTimeout(() => this.wrongAnswer = false, 300);
        console.log(`No adivinaste!, era ${this.currentQuestion.answer}`, 'Preguntados');
  
        // Resta uno de los intentos solo si la respuesta es incorrecta
        this.attempts--; 
        console.log(`Intentos restantes: ${this.attempts}`);
      }
  
      // Verificamos si se han agotado los intentos o si se han respondido todas las preguntas
      if (this.attempts === 0 || this.currentIndex >= this.listOfQuestions.length - 1) {
        this.endGame(false);
      } else {
        // Solo avanzamos a la siguiente pregunta si hay intentos restantes
        this.currentIndex++;
        setTimeout(() => {
          this.currentQuestion = this.listOfQuestions[this.currentIndex];
        }, 500);
      }
    }
  }

  private endGame(victory: boolean) {
    this.activeGame = false;
    this.gameOver = true;
    this.victory = victory;
    this.gameOverText = victory ? '¡GANASTE!' : '¡PERDISTE!';
  
    const email = this.userService.getUserEmail(); // Obtener el email del usuario
    if (email) { // Asegúrate de que no sea null
      this.resultadosService.guardarResultado(email, 'preguntados', this.score)
        .then(() => {
          console.log('Resultado guardado exitosamente');
        })
        .catch((error) => {
          console.error('Error al guardar el resultado:', error);
        });
    } else {
      console.error('No se pudo obtener el email del usuario.');
      Swal.fire({
        title: 'Error',
        text: 'No se pudo obtener el email del usuario. Asegúrate de que estás autenticado.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    
  
    Swal.fire({
      title: victory ? '¡Felicidades!' : '¡Lo siento!',
      text: victory
        ? '¡Ganaste el juego! Juega de nuevo.'
        : `Perdiste. La respuesta era ${this.currentQuestion.answer}. Intenta nuevamente.`,
      icon: victory ? 'success' : 'error',
      confirmButtonText: 'Reiniciar Juego',
    }).then(() => this.restartGame());
  }

    Swal.fire({
      title: victory ? '¡Felicidades!' : '¡Lo siento!',
      text: victory
        ? '¡Ganaste el juego! Juega de nuevo.'
        : `Perdiste. La respuesta era ${this.currentQuestion.answer}. Intenta nuevamente.`,
      icon: victory ? 'success' : 'error',
      confirmButtonText: 'Reiniciar Juego',
    }).then(() => this.restartGame());
  }

  restartGame() {
    this.resetGameState();
    this.generateQuestions();
    this.currentQuestion = this.listOfQuestions[this.currentIndex];
    console.log('Juego Reiniciado', 'Preguntados');
  }

  private resetGameState() {
    this.score = 0;
    this.attempts = 3; // Reseteamos intentos
    this.currentIndex = 0;
    this.activeGame = true;
    this.victory = false;
    this.gameOver = false;
    this.gameOverText = '¡PERDISTE!';
  }
}