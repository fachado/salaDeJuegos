// admin.guard.ts
import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from './user.service'; // Asegúrate de que la ruta sea correcta
import Swal from 'sweetalert2';

export const adminGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);

  // Verifica si el usuario está logueado y es administrador
  const isLoggedIn = userService.isUserLoggedIn();
  const isAdmin = userService.isUserAdmin();

  // Permite o bloquea el acceso según los roles y autenticación
  if (isLoggedIn && isAdmin) {
    return true; // Permite el acceso si está logueado y es admin
  } else {
    // Muestra un SweetAlert en caso de acceso denegado
    Swal.fire({
      title: 'Acceso denegado',
      text: isLoggedIn 
        ? 'Necesitas ser administrador para ver esta sección.' 
        : 'Necesitas estar logueado para ver esta sección.',
      icon: 'error',
      confirmButtonText: 'Aceptar',
    });
    return false; // Bloquea el acceso
  }
};