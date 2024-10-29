import { Injectable } from '@angular/core';
import { CardsService } from './cards.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BlackjackService {
  deckId!: string;
  playerScore: number = 0;
  dealerScore: number = 0;
  playerCards: any[] = [];
  dealerCards: any[] = [];
  gameEnded: boolean = false;

  constructor(private cardsService: CardsService) {}

  createDeck(): Observable<void> {
    return this.cardsService.createDeck().pipe(
      map((response) => {
        this.deckId = response.deck_id;
        this.resetGame();
      })
    );
  }

  drawCard(): Observable<any> {
    return this.cardsService.drawCard(this.deckId);
  }

  addCardToPlayer(card: any): void {
    this.playerCards.push(card);
    this.playerScore += this.getCardValue(card);
    this.checkPlayerBust();
  }

  addCardToDealer(card: any): void {
    this.dealerCards.push(card);
    this.dealerScore += this.getCardValue(card);
  }

  getCardValue(card: any): number {
    const value = card.value;
    if (value === 'JACK' || value === 'QUEEN' || value === 'KING') return 10;
    if (value === 'ACE') return 11;
    return parseInt(value);
  }

  checkPlayerBust(): void {
    if (this.playerScore > 21) {
      this.gameEnded = true;
    }
  }

  resetGame(): void {
    this.playerScore = 0;
    this.dealerScore = 0;
    this.playerCards = [];
    this.dealerCards = [];
    this.gameEnded = false;
  }
}