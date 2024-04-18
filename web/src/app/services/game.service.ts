import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from '../interfaces/env';
@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(public http:HttpClient) {
  }
  private playUrl = `${api}/play`
  private moveUrl = `${api}/hit/`
  private boardUrl = `${api}/show/`

  // Método para consumir la API de creación de juego
  consumirplay() {
    return this.http.get<any>(this.playUrl);
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

}
