import { select, NgRedux } from '@angular-redux/store';
import { Component, ViewChild} from '@angular/core';
import { ImageSelectorItem } from '../../models'
import { IOrder, IUIState } from '../../reducers/ui.reducer';
import { ImageSelectorComponent } from '../../components/image-selector/image-selector.component';

@Component({
  selector: 'app-order-details',  
  styleUrls: ['./order-details.component.css'],
  template: `
    <image-selector #sizesSelector [data]="sizes$ | async" (selectionChanged)=onSizeSelectedChanged($event)></image-selector>
    <image-selector #toppingsSelector [data]="toppings$ | async" [multiSelect]="true" [itemsInRow]="7" (selectionChanged)=onToppingsSelectedChanged($event)></image-selector>
    <div class="order-details-footer"> 
      <p-button label="Clear Cart" icon="fa fa-trash" (click)=clear()></p-button>
      <p-button label="Add" icon="fa fa-cart-plus" (click)="addOrder()"></p-button>
    </div>
  `
})
export class OrderDetailsComponent {
  @select(['staticData', 'sizes']) sizes$;
  @select(['staticData', 'toppings']) toppings$;

   @ViewChild("sizesSelector") sizesRef: ImageSelectorComponent;
   @ViewChild("toppingsSelector") toppingsRef: ImageSelectorComponent;

  private currentOrder: IOrder = { selectedPizza: null, selectedToppings: [] };

  constructor(private ngRedux: NgRedux<IUIState>) {
  }

  onToppingsSelectedChanged($event) {
    this.currentOrder.selectedToppings = <ImageSelectorItem[]>Array.from($event);
  }

  onSizeSelectedChanged($event) {
    this.currentOrder.selectedPizza = <ImageSelectorItem>Array.from($event)[0];
  }
 
  addOrder() {
    this.ngRedux.dispatch({type: 'ADD_ORDER', payload: this.currentOrder});
    alert('Your order added was to the cart')
    this.clear();    
  }

  clear() {
    this.sizesRef.clear();
    this.toppingsRef.clear();
  }
}
