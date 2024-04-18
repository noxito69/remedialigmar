import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameIdService {
  gameId: number | null = null;
  constructor() { }
}
