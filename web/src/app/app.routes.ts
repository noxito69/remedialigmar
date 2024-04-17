import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { IndexComponent } from './components/index/index.component';
import { BufferComponent } from './components/buffer/buffer.component';
import { TwoFAComponent } from './components/two-fa/two-fa.component';
import { BoardComponent } from './components/board/board.component';

export const routes: Routes = [

    {path:'index', component:IndexComponent},
    {path:'login', component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'buffer',component:BufferComponent},
    {path:'T2A',component:TwoFAComponent},
    {path:'board',component:BoardComponent}
    

];
