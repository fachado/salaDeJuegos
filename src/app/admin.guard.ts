// admin.guard.ts
import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

export const adminGuard: CanActivateFn = async (route, state) => {
  const auth = getAuth(); // Obtén la instancia de Auth directamente con getAuth()
  const router = inject(Router);

  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Verifica si el email es el de un administrador
        if (user.email === 'admin@gmail.com') {
          resolve(true); // Permite el acceso si es admin
        } else {
          Swal.fire({
            title: 'Acceso denegado',
            text: 'Necesitas ser administrador para ver esta sección.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          }).then(() => {
            router.navigate(['/']); // Redirige a la página principal u otra página
            resolve(false); // Bloquea el acceso
          });
        }
      } else {
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