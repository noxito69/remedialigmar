import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
(window as any).Pusher = Pusher

@Component({
  selector: 'app-buffer',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './buffer.component.html',
  styleUrl: './buffer.component.css',
})
export class BufferComponent {
  constructor(private router: Router) {}
  echo: Echo = new Echo({
    broadcaster:'pusher',
    key:'123',
    cluster:'mt1',
    wsHost:'127.0.0.1',
    wsPort:6001,
    forceTLS:false,
    disableStatus:true,
  })
  ngOnInit(): void {
    this.websocket()
  }

  websocket() {
    this.echo.channel('Joingame').listen('PlayerJoinedGame', (data: any) => {
      console.log('El jugador ' + data.playerId + ' se ha unido al juego ' + data.gameId);
      this.router.navigate(['/board']);
      localStorage.setItem('gameId', data.gameId.toString());
    })
    console.log(this.echo)
    this.echo.connect()
  }
}
