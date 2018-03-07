import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderDetailsComponent } from './order-details.component';
import { ImageSelectorComponent } from '../../components/image-selector/image-selector.component';
import { GrowlModule } from 'primeng/growl';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/components/common/messageservice';
import { RouterModule } from '@angular/router';
import { CartComponent } from '../cart/cart.component';

@NgModule({
  declarations: [
    OrderDetailsComponent,
    ImageSelectorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    GrowlModule,
    RouterModule.forChild([{path:'', component: OrderDetailsComponent}])
  ],
  providers: [MessageService]
})
export class OrderDetailsModule {

}