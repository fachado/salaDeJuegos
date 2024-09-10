import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  login() {
    if (this.username === 'admin' && this.password === 'admin123') {
      Swal.fire({
        icon: 'success',
        title: 'Login successful',
        text: 'You have successfully logged in!',
      }).then(() => {
        // Limpiar los campos después de mostrar la alerta
        this.clearForm();
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Login failed',
        text: 'Invalid username or password',
      }).then(() => {
        // Limpiar los campos después de mostrar la alerta
        this.clearForm();
      });
    }
    
  }
  clearForm() {
    this.username = '';
    this.password = '';
  }
}
