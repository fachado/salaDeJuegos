import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Auth, onAuthStateChanged, signOut } from '@angular/fire/auth';
import { LoginComponent } from "../componentes/login/login.component";
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // Importar el ícono
import { AhorcadoComponent } from '../ahorcado/ahorcado.component';
import { LayoutComponent } from '../layout/layout.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FontAwesomeModule ,RouterOutlet, RouterLink, RouterLinkActive, LoginComponent,CommonModule,AhorcadoComponent,LayoutComponent,CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'] // Cambié 'styleUrl' a 'styleUrls'
})

export class HomeComponent {


  constructor(private router: Router, private auth: Auth) {
    // Escuchar el estado de autenticación

  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }


}