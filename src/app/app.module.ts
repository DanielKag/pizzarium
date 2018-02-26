import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store'
import { combineReducers } from 'redux';

import { AppComponent } from './app.component';
import { OrderDetailsComponent } from './containers/order-details/order-details.component';
import { CartComponent } from './containers/cart/cart.component';
import { TopComponent } from './components/top/top.component';
import { SelectSizeComponent } from './components/select-size/select-size.component';
import { SelectToppingsComponent } from './components/select-toppings/select-toppings.component';
import { PizzaDetailsComponent } from './components/pizza-details/pizza-details.component';
import { environment } from '../environments/environment'
import { IDataFromServerState, dataFromServer } from './reducers/data-from-server.reducer';

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ImageSelectorComponent } from './components/image-selector/image-selector.component';


const routes: Routes = [
  { path: '', redirectTo: 'order', pathMatch: 'full' },
  { path: 'order', component: OrderDetailsComponent },
  { path: 'cart', component: CartComponent },
];

export interface IPizzariumState extends IDataFromServerState {
}

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
    NgReduxModule,
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
export class AppModule {
  
  constructor(ngRedux: NgRedux<any>,
              devTools: DevToolsExtension) {
    const reducers = combineReducers<any>(Object.assign({}, dataFromServer));
    let enhancers = [];
    const rootReducer = (state, action) => {
      return reducers(state, action);
    }

    if (!environment.production && devTools.isEnabled()) {
      enhancers = [...enhancers, devTools.enhancer()];
    }

    ngRedux.configureStore(rootReducer, undefined, undefined, enhancers);
  }
 }
