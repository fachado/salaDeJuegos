// chat.service.ts
import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private chatsCollection: any;

  constructor(private firestore: Firestore) {
    this.chatsCollection = collection(this.firestore, 'chats');
  }

  createMessage(message: { user: string; text: string; date: string }): Promise<any> {
    return addDoc(this.chatsCollection, message); // Asegúrate de retornar el resultado de addDoc
  }

  getMessages(): Observable<any[]> {
    return collectionData(this.chatsCollection);
  }
}