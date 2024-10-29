import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter,withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes, withComponentInputBinding()), provideFirebaseApp(() => initializeApp({"projectId":"fbst-8c19a","appId":"1:552161137797:web:b5458227427b525d8505ec","storageBucket":"fbst-8c19a.appspot.com","apiKey":"AIzaSyB67dt-tKq5o96n871EAP8BulvGdlF8J1w","authDomain":"fbst-8c19a.firebaseapp.com","messagingSenderId":"552161137797"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()),provideHttpClient()]
};
