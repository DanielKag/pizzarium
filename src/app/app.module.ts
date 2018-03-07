import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store'
import { combineReducers } from 'redux';

import { AppComponent } from './app.component';
import { OrderDetailsComponent } from './containers/order-details/order-details.component';
import { OrderDetailsModule } from './containers/order-details/order-details.module';
import { CartModule } from './containers/cart/cart.module';
import { CartComponent } from './containers/cart/cart.component';
import { TopComponent } from './components/top/top.component';
import { environment } from '../environments/environment'
import { IStaticDataState, staticDataReducer } from './reducers/static-data.reducer';
import { IUIState, uiReducer } from './reducers/ui.reducer';
import { httpMiddleware } from './reducers/http.middleware';

// PrimeNG
import { TabMenuModule } from 'primeng/tabmenu';
import { MessageService } from 'primeng/components/common/messageservice';
import { GrowlModule } from 'primeng/growl';

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
    TopComponent
  ],
  imports: [
    NgReduxModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    OrderDetailsModule,
    CartModule,
    TabMenuModule,
    GrowlModule
  ],
  providers: [MessageService]
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
