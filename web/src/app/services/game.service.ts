import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from '../interfaces/env';
import { Gameplay } from '../interfaces/gameplay';
@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(public http:HttpClient) {
  }
  private playUrl = `${api}/game/play`
  private moveUrl = `${api}/game/hit/`
  private boardUrl = `${api}/game/show/`
  private boarOponentdUrl = `${api}/game/showOponent/`

  // Método para consumir la API de creación de juego
  consumirplay() {
    return this.http.post<Gameplay>(this.playUrl, {});
  }

  // Método para consumir la API de movimiento
  consumirMove(gameId: number, x: number, y: number) {
    const url = `${this.moveUrl}${gameId}?x=${x}&y=${y}`;
    return this.http.post<any>(url, {});
  }

  // Método para consumir la API de mostrar tablero
  consumirBoard(gameId: number) {
    const url = `${this.boardUrl}${gameId}`;
    return this.http.get<any>(url);
  }
  consumirBoardOponent(gameId: number) {
    const url = `${this.boarOponentdUrl}${gameId}`;
    return this.http.get<any>(url);
  }

}
