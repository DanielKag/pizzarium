import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { OrderDetailsComponent } from './containers/order-details/order-details.component';
import { CartComponent } from './containers/cart/cart.component';
import { TopComponent } from './components/top/top.component';
import { SelectSizeComponent } from './components/select-size/select-size.component';
import { SelectToppingsComponent } from './components/select-toppings/select-toppings.component';
import { PizzaDetailsComponent } from './components/pizza-details/pizza-details.component';

// PrimeNG
import {ButtonModule} from 'primeng/button';
import {SelectButtonModule} from 'primeng/selectbutton';
import {ToggleButtonModule} from 'primeng/togglebutton';
import { ImageSelectorComponent } from './components/image-selector/image-selector.component';


const routes: Routes = [
  { path: '', redirectTo: 'order', pathMatch: 'full' },
  { path: 'order', component: OrderDetailsComponent },
  { path: 'cart', component: CartComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    OrderDetailsComponent,
    CartComponent,
    TopComponent,
    SelectSizeComponent,
    SelectToppingsComponent,
    PizzaDetailsComponent,
    ImageSelectorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ButtonModule,
    SelectButtonModule,
    ToggleButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
