import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { GameService } from '../../services/game.service';
import { Gameplay } from '../../interfaces/gameplay';
import { LoginService } from '../../services/login.service';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  constructor(private gameService: GameService, private router: Router, public loginService: LoginService) { }
  public partida:Gameplay = {
    message: '',
	  game_id: {
		id: 0,
		player1_id: 0,
		player2_id: 0,
		turn: 0,
		status: ''
	}
  }

  jugar() {
    this.gameService.consumirplay().subscribe(
      (response) => {
        if (response.message === 'Has creado una nueva partida, espera a que alguien se una') {
          this.router.navigate(['/buffer']);
          console.log(response)
        }
        else if (response.message === 'Te has unido a una partida pendiente como jugador 2') {
          this.router.navigate(['/board']);
          console.log(response)
        }
        else if (response.message === 'Ya estás en una partida pendiente')
          this.router.navigate(['/board']);
          console.log(response)
      },
      (error) => {
        console.error('Error al crear/join a la partida:', error);
      }
    );
  }
}
