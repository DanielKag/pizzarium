import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { Router } from '@angular/router';
import { Order } from '../../models';
import { IPizzariumState } from '../../app.module';
import { Message } from 'primeng/components/common/api';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { map, filter, tap } from 'rxjs/operators';
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";

@AutoUnsubscribe() 
@Component({
  selector: 'app-cart',  
  styleUrls: ['./cart.component.css'],
  template: `
    <ng-container *ngIf="orders$ | async as orders">
      <p-messages [(value)]="msgs"></p-messages>
      <div *ngIf="orders.length > 0; else noOrders" class="cart-container">
        <div *ngFor="let order of orders; let orderIndex = index" class="order">
          <div>Size: {{ order.selectedPizza.value }} - {{ order.selectedPizza.price }}₪</div>
          <div *ngIf="order.selectedToppings.length > 0; else noToppings">
            <div>Toppings:</div>
            <div *ngFor="let selectedTopping of order.selectedToppings; let i = index">
              <img [src]="selectedTopping.img" class="topping-image" [title]="selectedTopping.value" /><span>- {{selectedTopping.price}}₪</span>
            </div>
          </div>
          <ng-template #noToppings>
            No toppings selected.
          </ng-template>
          <div class="order-pizza-size">
            <div>Total: {{ order.getTotalPrice() }}₪</div>
            <i class="delete-pizza fa fa-times" (click)="deletePizzaFromCart(order, orderIndex)"></i>
          </div>
        </div>
      </div>
      <ng-template #noOrders>
        No items in cart
      </ng-template>
      <h2>Total price: {{ totalPrice$ | async }}₪</h2>
    </ng-container>
    <div class="cart-footer"> 
      <p-button label="Clear Cart" icon="fa fa-trash" (click)="clearCart()"></p-button>
      <p-button label="Order" icon="fa fa-fw fa-check" (click)="order()"></p-button>
    </div>
  `
})
export class CartComponent implements OnInit, OnDestroy {

  @select(['ui', 'orders']) orders$ : Observable<Order[]>;
  @select(['ui', 'totalPrice']) totalPrice$;
  
  // Public:
  public msgs: Message[] = [];

  // private:
  private promotionSubscription: Subscription;
  private readonly PROMO_FOR_9_ORDERS = 'On 9 Orders & Above - get 1 year subscription for the gym for free!';
  private readonly PROMO_FOR_6_ORDERS = 'On 6 Orders - get another Pizza + Garlic bread for free!';
  private readonly PROMO_FOR_3_ORDERS = 'On 3 Orders - get another Pizza for free!';

  // Ctor:
  constructor(private ngRedux: NgRedux<IPizzariumState>, private router: Router) { }
  
  // RXJS solution...
  ngOnInit() {
    this.promotionSubscription = this.orders$.pipe(
      map((orders: Order[]) => orders.length),
      filter((ordersCount: number) => ordersCount >= 3),
      tap((ordersCount: number) => this.SetPromotionMessage(this.PROMO_FOR_3_ORDERS)),
      filter((ordersCount: number) => ordersCount >= 6),
      tap((ordersCount: number) => this.SetPromotionMessage(this.PROMO_FOR_6_ORDERS)),
      filter((ordersCount: number) => ordersCount >= 9),
      tap((ordersCount: number) => this.SetPromotionMessage(this.PROMO_FOR_9_ORDERS)),
      ).subscribe( val => {
        // We just need it to listen the observable, all logic is made through the piping!
      })
    
  }

  private SetPromotionMessage(detailText: string) {
    this.msgs = [];
    this.msgs.push({severity:'info', summary:'Promotions', detail: detailText});
  }

  public deletePizzaFromCart(order: Order, pizzaIndex: number): void {
    this.ngRedux.dispatch({type: 'DELETE_ORDER', payload: {order, pizzaIndex}});
    this.ngRedux.dispatch({type: 'SHOW_MESSAGE', payload: {severity:'success', summary:'Pizzarium', detail:'Your order was deleted from the cart'}});
  }

  public clearCart(): void {
    this.ngRedux.dispatch({type: 'CLEAR_CART'});
    this.ngRedux.dispatch({type: 'SHOW_MESSAGE', payload: {severity: 'success', summary: 'Pizzarium', detail: 'Your cart was cleared!'}});
    this.router.navigateByUrl('/order');
  }

  public order(): void {
    this.ngRedux.dispatch({type: 'CLEAR_CART'});
    this.ngRedux.dispatch({type: 'SHOW_MESSAGE', payload: {severity:'success', summary:'Pizzarium', detail:'Your cart has been shipped to Hapsagot 9, Petah Tikva'}});
    this.router.navigateByUrl('/order');
  }

  // Do not remove this, it is necessary for AutoUnsubscribe
  ngOnDestroy() {}
}
