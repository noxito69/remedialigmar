import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { GameService } from '../../services/game.service';
import { Gameplay } from '../../interfaces/gameplay';
import { GameIdService } from '../../services/game-id.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent {
  constructor(
    private gameService: GameService,
    private router: Router,
    private gameIdService: GameIdService
  ) {}
  public partida: Gameplay = {
    message: '',
    game_id: {
      id: 0,
      player1_id: 0,
      player2_id: 0,
      turn: 0,
      status: '',
    },
  };

  jugar() {
    this.gameService.consumirplay().subscribe(
      (response) => {
        if (response.game_id && response.game_id.id) {
          localStorage.setItem('gameId', response.game_id.id.toString());
        }
  
        if (response.message === 'Has creado una nueva partida, espera a que alguien se una') {
          localStorage.setItem('gameId', response.game_id.id.toString()); // Mover la actualización del gameId aquí
          this.router.navigate(['/buffer']);
          console.log(response);
        } else if (response.message === 'Te has unido a una partida pendiente como jugador 2' || response.message === 'Ya estás en una partida pendiente') {
          localStorage.setItem('gameId', response.game_id.id.toString()); // Mover la actualización del gameId aquí
          this.router.navigate(['/board']);
          console.log(response);
        }
      },
      (error) => {
        console.error('Error al crear/join a la partida:', error);
      }
    );
  }
}
