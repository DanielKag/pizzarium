import { Component } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice'
import { IUIState } from '../../reducers/ui.reducer';
import { Order } from '../../models';

@Component({
  selector: 'app-cart',  
  styleUrls: ['./cart.component.css'],
  template: `
  Check
    <p-growl [(value)]="msgs"></p-growl>
    <div *ngIf="(orders$ | async).length === 0">No items in cart</div>
    <div class="cart-container">
      <div *ngFor="let order of orders$ | async; let orderIndex = index" class="order">
        <div>Size: {{ order.selectedPizza.value }} - {{ order.selectedPizza.extraData.price }}₪</div>
        <div *ngIf="order.selectedToppings.length > 0">
        <div>Toppings:</div>
          <div *ngFor="let selectedTopping of order.selectedToppings; let i = index">
            <img [src]="selectedTopping.img" class="topping-image" [title]="selectedTopping.value" /><span>- {{selectedTopping.extraData.price}}₪</span>
          </div>
        </div>
        <div *ngIf="order.selectedToppings.length === 0">
          No toppings selected.
        </div>
        <div class="order-pizza-size">
          <div>Total: {{ order.getTotalPrice() }}₪</div>
          <i class="delete-pizza fa fa-times" (click)="deletePizzaFromCart(order, orderIndex)"></i>
        </div>
      </div>
    </div>
    <h2>Total price: {{ totalPrice$ | async }}₪</h2>
    <div class="cart-footer"> 
      <p-button label="Clear Cart" icon="fa fa-trash" (click)="clearCart()"></p-button>
      <p-button label="Order" icon="fa fa-fw fa-check" (click)="order()"></p-button>
    </div>
  `
})
export class CartComponent {

  @select(['ui', 'orders']) orders$;
  @select(['ui', 'totalPrice']) totalPrice$;

  constructor(private ngRedux: NgRedux<IUIState>, private messageService: MessageService, private router: Router) { }

  public deletePizzaFromCart(order: Order, pizzaIndex: number): void {
    this.ngRedux.dispatch({type: 'DELETE_ORDER', payload: {order, pizzaIndex}});
    this.messageService.add({severity:'success', summary:'Pizzarium', detail:'Your order was deleted from the cart'});
  }

  public clearCart(): void {
    this.ngRedux.dispatch({type: 'CLEAR_CART'});
    this.messageService.add({severity:'success', summary:'Pizzarium', detail:'Your cart was cleared!'});
    setTimeout(() => this.router.navigateByUrl('/order'), 3000);
  }

  public order(): void {
    this.ngRedux.dispatch({type: 'CLEAR_CART'});
    this.messageService.add({severity:'success', summary:'Pizzarium', detail:'Your cart has been shipped to Hapsagot 9, Petah Tikva'});
    setTimeout(() => this.router.navigateByUrl('/order'), 3000);
  }
}
