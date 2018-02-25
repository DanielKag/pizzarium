import { Component, OnInit } from '@angular/core';
import {ImageSelectorItem} from '../../models'
 
@Component({
  selector: 'app-order-details',  
  styleUrls: ['./order-details.component.css'],
  template: `
    <image-selector [data]="sizes" (selectionChanged)=log($event)></image-selector>
    <image-selector [data]="toppings" [multiSelect]="true" [itemsInRow]="7" (selectionChanged)=log($event)></image-selector>
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
  public toppings: ImageSelectorItem[] = [
    {value: 'berries', img: '../assets/berries.png'}, 
    {value: 'brocoli', img: '../assets/brocoli.png'}, 
    {value: 'camamber', img: '../assets/camamber.png'}, 
    {value: 'cheese', img: '../assets/cheese.png'}, 
    {value: 'chilli', img: '../assets/chilli.png'}, 
    {value: 'garlic', img: '../assets/garlic.png'}, 
    {value: 'ginger', img: '../assets/ginger.png'}, 
    {value: 'lobster', img: '../assets/lobster.png'}, 
    {value: 'mashrooms', img: '../assets/mashrooms.png'}, 
    {value: 'olives', img: '../assets/olives.png'}, 
    {value: 'peperoni', img: '../assets/peperoni.png'}, 
    {value: 'pepper', img: '../assets/pepper.png'}, 
    {value: 'pickles', img: '../assets/pickles.png'}, 
    {value: 'shampinion', img: '../assets/shampinion.png'}, 
    {value: 'salad', img: '../assets/salad.png'}, 
    {value: 'shrimp', img: '../assets/shrimp.png'}, 
    {value: 'tomato', img: '../assets/tomato.png'},
    {value: 'nana', img: '../assets/nana.png'}, 
    {value: 'cherri', img: '../assets/cherri.png'}, 
    {value: 'green', img: '../assets/green.png'}, 
    {value: 'oyister', img: '../assets/oyister.png'}
  ]
    
    
  constructor() { }

  ngOnInit() {
  }

  log(data)  {
    console.log(data)
  }
}
