import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  username!: string;
  email!: string;
  password!: string;

  onSubmit() {
    console.log('Nombre de usuario: ', this.username);
    console.log('Email: ', this.email);
    console.log('Contraseña: ', this.password);
    // Aquí puedes agregar la lógica para registrar al usuario
  }

}
