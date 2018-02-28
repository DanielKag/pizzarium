import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { IPizzariumState } from '../../app.module';

@Component({
  selector: 'app-top',  
  styleUrls: ['./top.component.css'],
  template: `
    <div class="top">
      <span class="top-title">Pizzarium</span>
      <span class="top-title">
        <p-button label="Order" icon="fa fa-rocket" (click)="navigate('order')"></p-button>
      <p-button [label]="cartLabel$ | async" icon="fa fa-shopping-cart" (click)="navigate('cart')"></p-button>
      </span>
    </div>
  `
})
export class TopComponent implements OnInit {

  public cartLabel$: Observable<string>;

  constructor(private router: Router, private ngRedux: NgRedux<IPizzariumState>) { }

  ngOnInit() {

    this.cartLabel$ = this.ngRedux.select(state => {     
      
      return state.ui.orders.length > 0 
              ? 'Cart (' + state.ui.orders.length + ')'
              : 'Cart'
    })

  }

  navigate (url) {
        this.router.navigateByUrl('/' + url);
  };

}
