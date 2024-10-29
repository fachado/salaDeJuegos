import { Component,OnInit } from '@angular/core';
import { CardsService } from '../cards.service';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { ResultadosService } from '../resultados.service';
import Swal from 'sweetalert2';
import { BlackjackService } from '../blackjack.service';

@Component({
  selector: 'app-black-jack',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './black-jack.component.html',
  styleUrl: './black-jack.component.scss'
})
export class BlackjackComponent implements OnInit {
  deckId: string = '';
  playerCards: any[] = [];
  dealerCards: any[] = [];
  playerScore: number = 0;
  dealerScore: number = 0;
  gameStatus: string = 'En curso';
  gameEnded: boolean = false; // Variable para verificar si el juego terminó

  constructor(
    private cardsService: CardsService,
    private resultadosService: ResultadosService,
    private userService: UserService,

  ) {}

  ngOnInit(): void {

    this.startGame();
  }

  startGame(): void {
    this.cardsService.createDeck().subscribe(response => {
      this.deckId = response.deck_id;
      this.playerCards = [];
      this.dealerCards = [];
      this.playerScore = 0;
      this.dealerScore = 0;
      this.gameStatus = 'En curso';
      this.gameEnded = false;

      // Repartimos dos cartas al jugador y una al dealer al inicio
      this.drawPlayerCard();
      this.drawPlayerCard();
      this.drawDealerCard();
    });
  }

  drawPlayerCard(): void {
    if (!this.gameEnded) {
      this.cardsService.drawCard(this.deckId).subscribe(response => {
        const card = response.cards[0];
        this.playerCards.push(card);
        this.playerScore = this.calculateScore(this.playerCards);
        this.checkGameStatus();
      });
    }
  }

  drawDealerCard(): void {
    this.cardsService.drawCard(this.deckId).subscribe(response => {
      const card = response.cards[0];
      this.dealerCards.push(card);
      this.dealerScore = this.calculateScore(this.dealerCards);
    });
  }

  calculateScore(cards: any[]): number {
    let score = 0;
    let aces = 0;

    cards.forEach(card => {
      if (card.value === 'ACE') {
        score += 11;
        aces++;
      } else if (['KING', 'QUEEN', 'JACK'].includes(card.value)) {
        score += 10;
      } else {
        score += parseInt(card.value);
      }
    });

    while (score > 21 && aces) {
      score -= 10;
      aces--;
    }

    return score;
  }

  async stand(): Promise<void> {
    if (!this.gameEnded) {
      this.gameEnded = true; // Asegura que no se puedan pedir cartas adicionales
      while (this.dealerScore < 17) {
        await this.dealToDealerWithDelay();
      }
      this.finalizeGame();
    }
  }

  async dealToDealerWithDelay(): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        if (this.dealerScore < 17) { // Condición para detenerse
          this.drawDealerCard();
        }
        resolve();
      }, 800); // Retraso de 800ms entre cartas
    });
  }

  finalizeGame(): void {
    if (this.dealerScore > 21 || this.playerScore > this.dealerScore) {
      this.gameStatus = 'Ganaste';
      this.saveScore(true);
      Swal.fire({
        title: 'Ganaste',
        html: `¡Felicitaciones!<br>Puntaje final: ${this.playerScore}`,
        icon: 'success',
        timer: 2000
      });
    } else {
      this.gameStatus = 'Perdiste';
      this.saveScore(false);
      Swal.fire({
        title: 'Perdiste',
        html: `Puntaje del dealer: ${this.dealerScore}<br>Tu puntaje: ${this.playerScore}`,
        icon: 'error',
        timer: 2000
      });
    }
  }

checkGameStatus(): void {
    if (this.playerScore > 21) {
      this.gameEnded = true;
      this.gameStatus = 'Perdiste';
      this.saveScore(false);
      Swal.fire({
        title: 'Perdiste',
        html: `Te pasaste de 21<br>Tu puntaje: ${this.playerScore}`,
        icon: 'error'
      });
    } else if (this.playerScore === 21) {
      this.gameEnded = true;
      this.gameStatus = 'Ganaste';
      this.saveScore(true);
      Swal.fire({
        title: '¡Blackjack!',
        html: `Lograste 21<br>Puntaje final: ${this.playerScore}`,
        icon: 'success'
      });
    }
  }

  saveScore(won: boolean): void {
    const email = this.userService.getUserEmail();
    if (email) {
      const score = this.playerScore;
      const resultado = won ? 'Victoria' : 'Derrota';
      this.resultadosService.guardarResultado(email, 'Blackjack', score,);
    }
  }
}