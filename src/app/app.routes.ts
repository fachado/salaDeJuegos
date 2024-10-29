// app-routing.module.ts
import { Routes } from '@angular/router';
import { QuienSoyComponent } from './quien-soy/quien-soy.component';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './home/home.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { EncuestaComponent } from './encuesta/encuesta.component';
import { ListadoResultadosComponent } from './listado-resultados/listado-resultados.component';
import { adminGuard } from './admin.guard'; // Asegúrate de la ruta correcta
import { RespuestasEncuestaComponent } from './respuestas-encuesta/respuestas-encuesta.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: QuienSoyComponent },
    { path: 'login', component: LoginComponent },
    { path: 'encuesta', component: EncuestaComponent },
    { path: 'resultados', component: ResultadosComponent },
    { path: 'listado', component: ListadoResultadosComponent },

    

    { 
        path: 'resultadoEncuestas', 
        component: RespuestasEncuestaComponent, 
        canActivate: [adminGuard] // Protege esta ruta
    },


    {
        path: 'juegos/ahorcado',
        loadComponent: () => import('./ahorcado/ahorcado.component').then(m => m.AhorcadoComponent,), canActivate: [authGuard] 
    },
    {
        path: 'registro',
        loadComponent: () => import('./resgistro/resgistro.component').then(m => m.ResgistroComponent),
    },
    {
        path: 'chat',
        loadComponent: () => import('./chat/chat.component').then(m => m.ChatComponent),canActivate: [authGuard] 
    },
    {
        path: 'juegos/mayorMenor',
        loadComponent: () => import('./mayor-menor/mayor-menor.component').then(m => m.MayorMenorComponent),canActivate: [authGuard] 
    },
    {
        path: 'juegos/preguntados',
        loadComponent: () => import('./flag-quiz/flag-quiz.component').then(m => m.FlagQuizComponent),canActivate: [authGuard] 
    },  
    {
        path: 'juegos/blackjack',
        loadComponent: () => import('./black-jack/black-jack.component').then(m => m.BlackjackComponent),canActivate: [authGuard] 
    },
];