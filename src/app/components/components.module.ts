import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthNavbarComponent } from './auth-navbar/auth-navbar.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';



@NgModule({
  declarations: [
    AuthNavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,    
    MatMenuModule,
    MatListModule 
  ],
  exports: [
    AuthNavbarComponent,
  ]
})
export class ComponentsModule { }
