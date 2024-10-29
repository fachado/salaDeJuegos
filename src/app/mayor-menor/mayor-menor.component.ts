import { Component, OnInit } from '@angular/core';
import { CardsService } from '../cards.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ResultadosService } from '../resultados.service';
import { UserService } from '../user.service';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mayor-menor',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.scss']
})
export class MayorMenorComponent implements OnInit {
  deckId: string = '';
  currentCard: any = null;
  previousCardValue: number = 0;
  score: number = 0;
  message: string = '';
  user: any = null;

  constructor(
    private cardsService: CardsService,
    private resultadosService: ResultadosService,
    private userService: UserService,
    private router: Router,
    private auth: Auth,
  ) {}

  ngOnInit(): void {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.router.navigate(['/login']);
      }
    });
    this.startGame();
  }

  startGame(): void {
    this.cardsService.createDeck().subscribe((response) => {
      this.deckId = response.deck_id;
      this.score = 0;
      this.message = '';
      this.previousCardValue = 0;
      this.drawCard();
    });
  }

  drawCard(): void {
    this.cardsService.drawCard(this.deckId).subscribe((response) => {
      const card = response.cards[0];
      this.currentCard = card;
      const cardValue = this.getCardValue(card.value);

      if (this.previousCardValue !== 0) {
        if (
          (this.message === 'Mayor' && cardValue > this.previousCardValue) ||
          (this.message === 'Menor' && cardValue < this.previousCardValue)
        ) {
          this.score++;
        } else {
          this.guardarResultado(); // Guardar el resultado antes de reiniciar
          Swal.fire({
            title: '¡Perdiste!',
            text: `Tu puntaje final fue: ${this.score}`,
            icon: 'error',
            confirmButtonText: 'Reintentar'
          }).then(() => {
            this.startGame();
          });
          return;
        }
      }

      this.previousCardValue = cardValue;
    });
  }

  getCardValue(value: string): number {
    if (value === 'ACE') return 1;
    if (value === 'KING') return 13;
    if (value === 'QUEEN') return 12;
    if (value === 'JACK') return 11;
    return parseInt(value, 10);
  }

  guessHigher(): void {
    this.message = 'Mayor';
    this.drawCard();
  }

  guessLower(): void {
    this.message = 'Menor';
    this.drawCard();
  }

  guardarResultado(): void {
    const email = this.userService.getUserEmail(); // Obtener el email del usuario
  
    if (email) { // Solo continuar si email no es null
      this.resultadosService.guardarResultado(email, 'Mayor-Menor', this.score).then(() => {
        console.log('Resultado guardado exitosamente');
      }).catch((error) => {
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
    }
}
}