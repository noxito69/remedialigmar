import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { IndexComponent } from './index/index.component';
import { BufferComponent } from './buffer/buffer.component';
import { TwoFAComponent } from './two-fa/two-fa.component';
import { BoardComponent } from './board/board.component';

export const routes: Routes = [

    {path:'index', component:IndexComponent},
    {path:'login', component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'buffer',component:BufferComponent},
    {path:'T2A',component:TwoFAComponent},
    {path:'board',component:BoardComponent}
    

];
