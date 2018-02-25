import { Component, OnInit } from '@angular/core';
import {ImageSelectorItem} from '../../models'
 
@Component({
  selector: 'app-order-details',  
  styleUrls: ['./order-details.component.css'],
  template: `
    <image-selector [data]="sizes" (selectionChanged)=log($event)></image-selector>
    <image-selector [data]="sizes" [multiSelect]="true" (selectionChanged)=log($event)></image-selector>
    <app-select-size></app-select-size>
    <app-select-toppings></app-select-toppings>
    <div class="order-details-footer"> 
      <p-button label="Clear Cart" icon="fa fa-trash"></p-button>
      <p-button label="Add" icon="fa fa-cart-plus"></p-button>
    </div>
  `
})
export class OrderDetailsComponent implements OnInit {

  public sizes: ImageSelectorItem[] = [
      {value: 'Small', img: '../assets/pizza-medium.png'}, 
      {value: 'Medium', img: '../assets/pizza-medium.png'}
    ]
  //public toppings: string[] = ['olives', 'pineapples', 'tomato', 'mashrooms', 'onions', 'peppers', 'jalapenio', 'tuna', 'extra cheese', 'mozzarella', 'corn', 'peperoni']
    
    
  constructor() { }

  ngOnInit() {
  }

  log(data)  {
    console.log(data)
  }
}
