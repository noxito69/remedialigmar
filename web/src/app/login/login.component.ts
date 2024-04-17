import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username!: string;
  password!: string;

  onSubmit() {
    console.log('Nombre de usuario: ', this.username);
    console.log('Contraseña: ', this.password);
    // Aquí puedes agregar la lógica para autenticar al usuario
  }

}
