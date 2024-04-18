import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { IndexComponent } from './components/index/index.component';
import { BufferComponent } from './components/buffer/buffer.component';
import { TwoFAComponent } from './components/two-fa/two-fa.component';
import { BoardComponent } from './components/board/board.component';
import { authGuard } from './guards/authguard.guard';
import { HistorialComponent } from './components/historial/historial.component';

export const routes: Routes = [
    {path:'', redirectTo: 'login', pathMatch: 'full'},
    {path:'index', component:IndexComponent, canActivate: [authGuard]},
    {path:'login', component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'buffer',component:BufferComponent, canActivate: [authGuard]},
    {path:'T2A',component:TwoFAComponent},
    {path:'board',component:BoardComponent, canActivate: [authGuard]},
    {path:'historial',component:HistorialComponent, canActivate: [authGuard]}    
];
