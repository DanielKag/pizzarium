import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-details',  
  styleUrls: ['./order-details.component.css'],
  template: `
    <app-select-size></app-select-size>
    <app-select-toppings></app-select-toppings>
    <div class="order-details-footer"> 
      <p-button label="Clear Cart" icon="fa fa-trash"></p-button>
      <p-button label="Add" icon="fa fa-cart-plus"></p-button>
    </div>
  `
})
export class OrderDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
