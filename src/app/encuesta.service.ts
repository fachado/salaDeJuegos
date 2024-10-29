// encuesta.service.ts
import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc,getDocs ,collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class EncuestaService {
  private encuestasCollection: any;

  constructor(private firestore: Firestore) {
    this.encuestasCollection = collection(this.firestore, 'encuestas');
  }

  saveEncuesta(encuesta: any): Promise<any> {
    return addDoc(this.encuestasCollection, encuesta);
  }
  getEncuestas(): Observable<any[]> {
    return collectionData(this.encuestasCollection, { idField: 'id' });
  }
}
