import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './cart.component';
import { GrowlModule } from 'primeng/growl';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/components/common/messageservice';


@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    GrowlModule,
  ],
  providers: [MessageService]
})
export class CartModule {
}