import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store'
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { combineReducers } from 'redux';

import { AppComponent } from './app.component';
import { OrderDetailsComponent } from './containers/order-details/order-details.component';
import { CartComponent } from './containers/cart/cart.component';
import { TopComponent } from './components/top/top.component';
import { environment } from '../environments/environment'
import { IStaticDataState, staticDataReducer } from './reducers/static-data.reducer';
import { IUIState, uiReducer } from './reducers/ui.reducer';
import { httpMiddleware } from './reducers/http.middleware';

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { GrowlModule } from 'primeng/growl';
import {TabMenuModule} from 'primeng/tabmenu';
import {MessageService} from 'primeng/components/common/messageservice'

import { ImageSelectorComponent } from './components/image-selector/image-selector.component';



const routes: Routes = [
  { path: '', redirectTo: 'order', pathMatch: 'full' },
  { path: 'order', component: OrderDetailsComponent },
  { path: 'cart', component: CartComponent },
];

export interface IPizzariumState {
  staticData: IStaticDataState, 
  ui: IUIState
}  


@NgModule({
  declarations: [
    AppComponent,
    OrderDetailsComponent,
    CartComponent,
    TopComponent,
    ImageSelectorComponent
  ],
  imports: [
    NgReduxModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ButtonModule,
    SelectButtonModule,
    ToggleButtonModule,
    GrowlModule,
    TabMenuModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {
  
  constructor(ngRedux: NgRedux<IPizzariumState>,
              devTools: DevToolsExtension) {

    const reducers = combineReducers<IPizzariumState>({
                staticData: staticDataReducer,
                ui: uiReducer
            });
    let enhancers = [];
    
    if (!environment.production && devTools.isEnabled()) {
      enhancers = [...enhancers, devTools.enhancer()];
    }

    const middleswares = [];
    middleswares.push(httpMiddleware);

    ngRedux.configureStore(reducers, undefined, middleswares, enhancers);
  }
 } 
