import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-historial',
  standalone: true,
  providers: [HttpClient],
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css'],


})
export class HistorialComponent implements OnInit {

  partidas: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
      
    this.getPartidas();
  }

  getPartidas(): void {
    this.http.get('http://127.0.0.1:8000/api/game/historial').subscribe((data: any) => {
      this.partidas = data.partidas;
    });
  }

}
