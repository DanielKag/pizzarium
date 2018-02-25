import { Component, OnInit } from '@angular/core';
import {Pizza} from '../../models';

@Component({
  selector: 'app-cart',  
  styleUrls: ['./cart.component.css'],
  template: `
    <div *ngFor="let pizza of pizzas">  
      <app-pizza-details [pizza] = "pizza"></app-pizza-details>
    </div>
    <div class="cart-footer"> 
      <p-button label="Clear Cart" icon="fa fa-fw fa-trash-alt"></p-button>
      <p-button label="Order" icon="fa fa-fw fa-check"></p-button>
    </div>
  `
})
export class CartComponent implements OnInit {

  public pizzas: Pizza[] = [
    {size: 'M', toppings: ['olives', 'pineapple']},
    {size: 'M', toppings: ['olives', 'pineapple']},
    {size: 'M', toppings: ['olives', 'pineapple']},
    {size: 'M', toppings: ['olives', 'pineapple']}
  ];

  constructor() { }

  ngOnInit() {
  }

}
