import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Auth, onAuthStateChanged, signOut } from '@angular/fire/auth';
import { LoginComponent } from "../componentes/login/login.component";
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // Importar el ícono
import { AhorcadoComponent } from '../ahorcado/ahorcado.component';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [FontAwesomeModule ,RouterOutlet, RouterLink, RouterLinkActive, LoginComponent,CommonModule,AhorcadoComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  isLoggedIn: boolean = false;
  userEmail: string | null = null;
  faSignOutAlt = faSignOutAlt; // Referencia al ícono

  constructor(private router: Router, private auth: Auth) {
    // Escuchar el estado de autenticación
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.isLoggedIn = true;
        this.userEmail = user.email;
      } else {
        this.isLoggedIn = false;
        this.userEmail = null;
      }
    });
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
  isMenuOpen = false; // Estado del menú

  toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen; // Cambiar el estado
  }
  logout() {
    signOut(this.auth).then(() => {
      this.isLoggedIn = false;
      this.userEmail = null;
      this.router.navigate(['/login']);
    });
  }
}
