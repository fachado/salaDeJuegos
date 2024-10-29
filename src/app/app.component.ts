import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { LoginComponent } from "./componentes/login/login.component";
import { QuienSoyComponent } from "./quien-soy/quien-soy.component";
import { HomeComponent } from "./home/home.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LayoutComponent } from './layout/layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FontAwesomeModule,RouterOutlet, FormsModule, NgIf, NgFor, LoginComponent, QuienSoyComponent, HomeComponent,LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Labo_IV';
  
}
