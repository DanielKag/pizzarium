import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './cart.component';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    RouterModule.forChild([{path:'', component:CartComponent}])
  ]
})
export class CartModule {
}