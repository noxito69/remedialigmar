import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { GameService } from '../../services/game.service';
import { Gameplay } from '../../interfaces/gameplay';
import { LoginService } from '../../services/login.service';
import { Injectable } from '@angular/core';
import { LogoutService } from '../../services/logout.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent implements OnInit{
  constructor(
    private gameService: GameService,
    private LogouteServeice:LogoutService,
    private LoginService:LoginService,
    private router: Router,
  ) {}
  public usuario = ''
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
  ngOnInit(): void {
    this.infoUsuario()
  }
  jugar() {
    this.gameService.consumirplay().subscribe(
      (response) => {
        if (response.game_id && response.game_id.id) { // Verificar si response.game_id está definido y si su propiedad id también está definida
          localStorage.setItem('gameId', response.game_id.id.toString());
        }
  
        if (response.message === 'Has creado una nueva partida, espera a que alguien se una') {
          this.router.navigate(['/buffer']);
          console.log(response);
        } else if (response.message === 'Te has unido a una partida pendiente como jugador 2' || response.message === 'Ya estás en una partida pendiente') {
          this.router.navigate(['/board']);
          console.log(response);
        }
      },
      (error) => {
        console.error('Error al crear/join a la partida:', error);
      }
    );
  }
  logout(){
    this.LogouteServeice.consumirlogout().subscribe(
      (response)=>{
        this.router.navigate(['/login']);
        console.log(response.message)
      }, (error)=>{
        console.log(error.error)
      })
  }
  infoUsuario(){
    this.LoginService.VerificarAutenticacion().subscribe(
      (response)=>{
        this.usuario = response.name
        console.log(response.name)
      }, (error)=>{
        console.log(error.error)
      })
  }
  
}
