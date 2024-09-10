import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { LoginComponent } from "./componentes/login/login.component";
import { QuienSoyComponent } from "./quien-soy/quien-soy.component";
import { HomeComponent } from "./home/home.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgIf, NgFor, LoginComponent, QuienSoyComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Labo_IV';
  
}
