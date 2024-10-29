import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 
import { UserService } from '../../user.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  
  constructor(
    private router: Router,
    private firestore: Firestore,
    private auth: Auth,
    private userService: UserService // Inyecta el servicio
  ) {}

  async login() {
    try {
      // Validar usuario con Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(this.auth, this.username, this.password);
      const user = userCredential.user;

      // Registrar el log en Firestore
      const col = collection(this.firestore, "logins");
      await addDoc(col, {
        fecha: new Date(),
        user: this.username
      });

      // Guardar el correo en el UserService
      this.userService.setUserEmail(this.username);
      const email = this.userService.getUserEmail();
      console.log('Email del usuario:', email); // Esto debería mostrar 'usuario@example.com'

      // Mostrar alerta de éxito
      Swal.fire({
        icon: 'success',
        title: 'Login exitoso',
        text: '¡Has iniciado sesión correctamente!',
      }).then(() => {
        this.clearForm();
        this.router.navigate(['']); // Redirige a la página principal o donde quieras
      });

    } catch (error) {
      // Si ocurre un error (login fallido)
      Swal.fire({
        icon: 'error',
        title: 'Error de inicio de sesión',
        text: 'Usuario o contraseña incorrectos',
      }).then(() => {
        this.clearForm();
      });
    }
  }

  clearForm() {
    this.username = '';
    this.password = '';
  }

  rellenarForm() {
    this.username = 'hola@gmail.com';
    this.password = '123456';
  }
  rellenarFormadmin() {
    this.username = 'admin@gmail.com';
    this.password = 'imposible';
  }
}