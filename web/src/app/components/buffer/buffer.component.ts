import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
@Component({
  selector: 'app-buffer',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './buffer.component.html',
  styleUrl: './buffer.component.css',
})
export class BufferComponent {
  constructor(private router: Router) { }
  private echo: Echo;
  ngOnInit(): void {
  }
  websocket()   {
    this.echo = new Echo({
      broadcaster: 'pusher',
      key: '123',
      cluster: 'mt1',
      wsHost: '127.0.0.1',
      wsPort: 6001,
      forceTLS: false,
      disableStatus: true,
    });
    
    this.echo.channel('Joingame').listen('ChatEvent', (e:any) => {
      this.router.navigate(['/tablero', data.gameId]);
    })
  }
}
