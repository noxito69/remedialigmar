import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {

  boardState: string[][] = JSON.parse("[[\"B\",\"A\",\"A\",\"A\",\"A\"],[\"A\",\"B\",\"A\",\"B\",\"A\"],[\"A\",\"B\",\"B\",\"A\",\"B\"],[\"A\",\"A\",\"A\",\"A\",\"A\"],[\"A\",\"A\",\"B\",\"B\",\"B\"],[\"B\",\"B\",\"B\",\"A\",\"B\"],[\"A\",\"A\",\"A\",\"B\",\"A\"],[\"A\",\"A\",\"A\",\"A\",\"B\"]]");
  numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
  letters: string[] = ['A', 'B', 'C', 'D', 'E'];

  onButtonClick(x: number, y: number): void {
    console.log(`Button at coordinate (${x}, ${y}) was clicked.`);
  }

}
