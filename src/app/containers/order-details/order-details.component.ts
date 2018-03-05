import { MessageService } from 'primeng/components/common/messageservice'
import { select, NgRedux } from '@angular-redux/store';
import { Component, ViewChild} from '@angular/core';
import { ImageSelectorItem } from '../../models'
import { Order } from '../../models';
import { ImageSelectorComponent } from '../../components/image-selector/image-selector.component';
import { IPizzariumState } from '../../app.module';

@Component({
  selector: 'app-order-details',  
  styleUrls: ['./order-details.component.css'],
  template: `
    <p-growl [(value)]="msgs"></p-growl>
    <image-selector #sizesSelector *ngIf="sizes$ | async" [data]="sizes$ | async" (selectionChanged)=onSizeSelectedChanged($event)></image-selector>
    <image-selector #toppingsSelector *ngIf="toppings$ | async" [data]="toppings$ | async" [multiSelect]="true" [itemsInRow]="7" (selectionChanged)=onToppingsSelectedChanged($event)></image-selector>
    <div class="order-details-footer"> 
      <p-button label="Clear Order" icon="fa fa-trash" (click)=clear()></p-button>
      <p-button label="Add" icon="fa fa-cart-plus" (click)="addOrder()"></p-button>
    </div>
  `
})
export class OrderDetailsComponent {
  @select(['staticData', 'sizes']) sizes$;
  @select(['staticData', 'toppings']) toppings$;

  @ViewChild("sizesSelector") sizesRef: ImageSelectorComponent;
  @ViewChild("toppingsSelector") toppingsRef: ImageSelectorComponent;

  private currentOrder: Order;

  constructor(private ngRedux: NgRedux<IPizzariumState>, private messageService: MessageService) {
    this.resetCurrentOrder();
  }

  public onToppingsSelectedChanged($event): void {
    this.currentOrder.selectedToppings = <ImageSelectorItem[]>Array.from($event);
  }

  public onSizeSelectedChanged($event): void {
    this.currentOrder.selectedPizza = <ImageSelectorItem>Array.from($event)[0];
  }
 
  public addOrder(): void {
    this.ngRedux.dispatch({type: 'ADD_ORDER', payload: this.currentOrder});
    this.messageService.add({severity:'success', summary:'Pizzarium', detail:'Your order was added to the cart'});

    this.clear();    
  }

  public clear(): void {
    this.resetCurrentOrder();
    this.sizesRef.clear();
    this.toppingsRef.clear();
  }

  private resetCurrentOrder(): void {
    this.currentOrder = new Order();
    this.currentOrder.selectedPizza = null;
    this.currentOrder.selectedToppings = [];
  }
}
