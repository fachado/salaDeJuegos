import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-quien-soy',
  standalone: true,
  imports: [],
  templateUrl: './quien-soy.component.html',
  styleUrl: './quien-soy.component.scss'
})
export class QuienSoyComponent implements OnInit {
  myProfile: any = null;
  user: any = null;

  constructor(
    private http: HttpClient,
    private router: Router,

  ) {}

  ngOnInit(): void {
  
       
   
        this.http
          .get('https://api.github.com/users/fachado')
          .subscribe((res: any) => {
            this.myProfile = res;
          });
      } 

  test() {
    console.log(this.myProfile);
  }

  irAMiJuego(): void {
    this.router.navigate(["/blackjack"]);
  }
}
