import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-top',  
  styleUrls: ['./top.component.css'],
  template: `
    <div class="top">
      <span class="top-title">Pizzarium</span>
      <span class="top-title">
        <p-button label="Order" icon="fa fa-rocket" (click)="navigate('order')"></p-button>
      <p-button label="Cart" icon="fa fa-shopping-cart" (click)="navigate('cart')"></p-button>
      </span>
    </div>
  `
})
export class TopComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigate (url) {
        this.router.navigateByUrl('/' + url);
  };

}
