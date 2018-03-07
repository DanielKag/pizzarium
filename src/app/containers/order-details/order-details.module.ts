import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderDetailsComponent } from './order-details.component';
import { ImageSelectorComponent } from '../../components/image-selector/image-selector.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    OrderDetailsComponent,
    ImageSelectorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule
  ],
  providers: []
})
export class OrderDetailsModule {

}