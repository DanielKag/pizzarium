import { Component } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IDataFromServerState } from './reducers/data-from-server.reducer';

@Component({
  selector: 'app-root',  
  styleUrls: ['./app.component.css'],
  template: `
    <app-top></app-top>    
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'app';

  constructor(private ngRedux: NgRedux<IDataFromServerState>) {
    this.ngRedux.dispatch({type: 'ndv'});
  }
}
