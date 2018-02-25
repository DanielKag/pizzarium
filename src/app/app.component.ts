import { Component } from '@angular/core';

@Component({
  selector: 'app-root',  
  styleUrls: ['./app.component.css'],
  template: `
  kgn
    <app-top></app-top>    
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'app';
}
