import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgReduxModule } from '@angular-redux/store'
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { OrderDetailsComponent } from './order-details.component';
import { ImageSelectorComponent } from '../../components/image-selector/image-selector.component';
import { GrowlModule } from 'primeng/growl';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/components/common/messageservice';

@NgModule({
  declarations: [
    OrderDetailsComponent,
    ImageSelectorComponent
  ],
  imports: [
    NgReduxModule,
    BrowserAnimationsModule,
    FormsModule,
    ButtonModule,
    GrowlModule,
  ],
  providers: [MessageService],
  bootstrap: [OrderDetailsComponent]
})
export class OrderDetailsModule {

}