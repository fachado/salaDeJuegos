import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router'; 


@Component({
  selector: 'app-resgistro',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterLink],

  templateUrl: './resgistro.component.html',
  styleUrl: './resgistro.component.scss'
})



export class ResgistroComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private firestore: Firestore, private auth: Auth) {}

  async register() {
    try {
      // Crear un nuevo usuario con Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(this.auth, this.username, this.password);
      const user = userCredential.user;

      // Registrar el usuario en Firestore
      let col = collection(this.firestore, "users"); // Cambia "users" al nombre de tu colección si es necesario
      await addDoc(col, {
        uid: user.uid,
        email: this.username,
        fechaRegistro: new Date(),
      });

      // Mostrar alerta de éxito
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: '¡Te has registrado correctamente!',
      }).then(() => {
        this.clearForm();
        this.router.navigate(['login']); // Redirigir a la página de login o donde desees
      });

    } catch (error) {
      // Si ocurre un error (registro fallido)
      Swal.fire({
        icon: 'error',
        title: 'Error de registro',
        text: 'Ocurrió un error al registrar el usuario',
      }).then(() => {
        this.clearForm();
      });
    }
  }

  clearForm() {
    this.username = '';
    this.password = '';
  }
}