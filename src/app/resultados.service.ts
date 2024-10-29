import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, query, where, doc, updateDoc, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface Resultado {
  usuarioId: string;
  juego: string;
  puntajeTotal: number;
  jugados: number;
  fecha: Date;
}

@Injectable({
  providedIn: 'root',
})
export class ResultadosService {
  private resultadosCollection: any;

  constructor(private firestore: Firestore) {
    this.resultadosCollection = collection(this.firestore, 'resultados');
  }

  async guardarResultado(usuarioId: string, juego: string, puntaje: number): Promise<void> {
    const resultadosQuery = query(this.resultadosCollection, where('usuarioId', '==', usuarioId), where('juego', '==', juego));
    const resultadosSnapshot = await getDocs(resultadosQuery);

    if (!resultadosSnapshot.empty) {
      // Si el usuario ya tiene resultados para este juego, actualiza
      const docRef = doc(this.firestore, 'resultados', resultadosSnapshot.docs[0].id);
      const data = resultadosSnapshot.docs[0].data() as Resultado; // Aquí hacemos la afirmación de tipo

      const totalJugados = data.jugados + 1; // Incrementa la cantidad de veces jugadas
      const totalPuntaje = data.puntajeTotal + puntaje; // Suma el nuevo puntaje al total

      await updateDoc(docRef, {
        jugados: totalJugados,
        puntajeTotal: totalPuntaje,
      });
    } else {
      // Si no existe, crea un nuevo documento
      const resultado: Resultado = {
        usuarioId: usuarioId,
        juego: juego,
        puntajeTotal: puntaje,
        jugados: 1,
        fecha: new Date(),
      };
      await addDoc(this.resultadosCollection, resultado);
    }
  }

  getResultadosPorUsuario(usuarioId: string): Observable<any[]> {
    const resultadosQuery = query(this.resultadosCollection, where('usuarioId', '==', usuarioId));
    return collectionData(resultadosQuery);
  }

  getResultados(): Observable<any[]> {
    return collectionData(this.resultadosCollection);
  }
}