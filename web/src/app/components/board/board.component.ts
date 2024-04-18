import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameIdService } from '../../services/game-id.service';
import { GameService } from '../../services/game.service';
import { Router } from '@angular/router';
import { Gameplay } from '../../interfaces/gameplay';
import { Board } from '../../interfaces/board';
import { ParseSourceFile } from '@angular/compiler';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-board',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent implements OnInit{
  constructor(private gameService: GameService, private router: Router, private gameIdService: GameIdService) { }
  boardState: string[][] = [[]];
  public board : Board = {
    board: {
      id: 0,
      game_id: 0,
      player_id: 0,
      board_state: ''
    }  
  }

  ngOnInit(): void {
    const gameId = localStorage.getItem('gameId'); // Obtener el ID del juego del localStorage
    if (gameId) {
      this.gameService.consumirBoard(parseInt(gameId, 10)).subscribe(
        response => {
          this.boardState = JSON.parse(response.board.board_state);
          console.log(response.board.board_state);
        },
        error => {
          console.error('Error al obtener el tablero:', error);
         }
      );
    } else {
      console.error('ID del juego no disponible');
    }
  }
  
  numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
  letters: string[] = ['A', 'B', 'C', 'D', 'E'];

  onButtonClick(x: number, y: number): void {
    const gameId = localStorage.getItem('gameId') || '';
      this.gameService.consumirMove(parseInt(gameId), x, y).subscribe(
        (response)=>{
          if(response.message === '¡Has golpeado un barco!'){
            Swal.fire({
              position: "center",
              icon: "success",
              title: response.message,
              showConfirmButton: false,
              timer: 1500
            });
          }
          else if(response.message === 'Solo hay agua en esta posición.'){
            Swal.fire({
              position: "center",
              icon: "error",
              title: response.message,
              showConfirmButton: false,
              timer: 1500
            });
          }
          console.log(response)
        }, (error)=>{
          Swal.fire({
            position: "center",
            icon: "error",
            title: error.error,
            showConfirmButton: false,
            timer: 1500
          });
          console.log(error)
        }
      )
  }

}
