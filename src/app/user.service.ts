// user.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userEmailKey = 'userEmail'; // Clave para localStorage

  setUserEmail(email: string) {
    localStorage.setItem(this.userEmailKey, email); // Guarda el email en localStorage
    console.log('Email guardado:', email);
  }

  getUserEmail(): string | null {
    const email = localStorage.getItem(this.userEmailKey); // Obtiene el email de localStorage
    console.log('Obteniendo email:', email);
    return email;
  }

  clearUserEmail() {
    localStorage.removeItem(this.userEmailKey); // Método para limpiar el email
  }
    // Método para verificar si el usuario es admin
    isUserAdmin(): boolean {
      const email = localStorage.getItem(this.userEmailKey); // Obtiene el email de localStorage


      return email === 'admin@gmail.com';
      
    }
    isUserLoggedIn(): boolean {
      const email = localStorage.getItem(this.userEmailKey); // Obtiene el email de localStorage
      return email !== null; // Devuelve true si el email está presente, false si no
    }
}