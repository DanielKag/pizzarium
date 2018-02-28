import { Component, OnInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import {Pizza} from '../../models';

@Component({
  selector: 'app-cart',  
  styleUrls: ['./cart.component.css'],
  template: `
    
    <div *ngIf="(orders$ | async).length === 0">No items in cart</div>

    <div *ngFor="let order of orders$ | async">  
      <div>slkdfjslkdf</div>
    </div>
    <div class="cart-footer"> 
      <p-button label="Clear Cart" icon="fa fa-trash"></p-button>
      <p-button label="Order" icon="fa fa-fw fa-check"></p-button>
    </div>
  `
})
export class CartComponent implements OnInit {

  @select(['ui', 'orders']) orders$;

  constructor() { }

  ngOnInit() {
  }

}
