// chat.component.ts
import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import moment from 'moment';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
interface Message {
  user: any; // Aquí puedes definir un tipo más específico si lo deseas
  text: string;
  
  date: any;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule,FormsModule,FontAwesomeModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  user: any = null;
  newMessage: string = '';
  messageList: Message[] = [];
  sendIcon = faPaperPlane;

  constructor(
    private router: Router,
    private auth: Auth,
    private chatService: ChatService,
    
  ) {
    // Suscribirse a los mensajes
    this.chatService.getMessages().subscribe((messages) => {
      if (messages !== null) {
        this.messageList = messages;
        for (let i = 0; i < this.messageList.length; i++) {
          const chat = this.messageList[i];
          chat.date = this.convertDateToUnix(chat);
          console.log(chat.date);
        }
        this.messageList.sort((a: any, b: any) => a.date - b.date);
        for (let i = 0; i < this.messageList.length; i++) {
          const chat = this.messageList[i];
          chat.date = moment(new Date(chat.date)).format('DD-MM-YYYY HH:mm:ss');
        }
        setTimeout(() => {
          this.scrollToTheLastElementByClassName();
        }, 100);
      }
    });
  }

  ngOnInit(): void {
    // Obtener el usuario autenticado
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.router.navigate(['/login']);
      }
    });
  } // end of ngOnInit

  sendMessage() {
    if (this.newMessage.trim() === '') {
      // Puedes usar un servicio de notificación aquí
      console.warn('Debes escribir un mensaje');
      return;
    }
    const date = moment(new Date()).format('DD-MM-YYYY HH:mm:ss');
    const message: Message = {
      user: this.user.email, // Almacenar el email del usuario
      text: this.newMessage,
      date: date,
    };
    this.chatService.createMessage(message).then(() => {
      this.newMessage = ''; // Limpiar el campo de entrada
      this.scrollToTheLastElementByClassName();
    });
  } // end of sendMessage

  scrollToTheLastElementByClassName() {
    const contenedorMensajes = document.getElementById('contenedor-mensajes');
    if (contenedorMensajes) {
      contenedorMensajes.scrollTop = contenedorMensajes.scrollHeight;
    }
  } // end of scrollToTheLastElementByClassNam
  convertDateToUnix(chat: any) {
    const initialDate = chat.date;
    const splitDate = initialDate.split(' ');
    const date = splitDate[0].split('-');
    const time = splitDate[1].split(':');
    const dd = date[0];
    const mm = date[1] - 1;
    const yyyy = date[2];
    const hh = time[0];
    const min = time[1];
    const ss = time[2];
    const dateDate = new Date(yyyy, mm, dd, hh, min, ss);

    return dateDate.getTime();
  }
}