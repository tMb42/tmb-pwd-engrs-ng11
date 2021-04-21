import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendMailComponent } from '../send-mail/send-mail.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const AuthRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'contact',
        component: SendMailComponent
      }, 
      {
        path: 'login',
        component: LoginComponent
      },  
      {
        path: 'register',
        component: RegisterComponent
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(AuthRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
