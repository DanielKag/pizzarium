import { Component } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IStaticDataState } from './reducers/static-data.reducer';

@Component({
  selector: 'app-root',  
  styleUrls: ['./app.component.css'],
  template: `
    <app-top></app-top>    
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor(private ngRedux: NgRedux<IStaticDataState>) {
    this.ngRedux.dispatch({
      type: 'GET_TOPPINGS',
      payload: {
        url: 'http://localhost:3000/toppings',
        isHttp: true
      }});
    
    this.ngRedux.dispatch({
      type: 'GET_SIZES',
      payload: {
        url: 'http://localhost:3000/sizes',
        isHttp: true
      }});    
  }
}
