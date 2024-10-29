// auth.guard.ts
import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = async (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  // Devuelve una promesa para manejar la verificación del estado de autenticación
  return new Promise((resolve) => {
    auth.onAuthStateChanged(user => {
      if (user) {
        resolve(true); // El usuario está logueado
      } else {
        // Muestra un SweetAlert en caso de acceso denegado
        Swal.fire({
          title: 'Acceso denegado',
          text: 'Necesitas estar logueado para ver esta sección.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          router.navigate(['/login']); // Redirige a la página de login
          resolve(false); // Bloquea el acceso
        });
      }
    });
  });
};
