import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router } from '@angular/router';
import { select, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { IPizzariumState } from '../../app.module';
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";

@AutoUnsubscribe()
@Component({
  selector: 'app-top',
  styleUrls: ['./top.component.css'],
  template: `
    <p-growl [(value)]="msgs"></p-growl>
    <div class="">
      <img class="top-title" src="../assets/logo4.png">
      <p-tabMenu [model]="items" styleClass="top"></p-tabMenu>
      <span class="top-title">
      </span>
    </div>
  `
})
export class TopComponent implements OnInit, OnDestroy {

  public cartLabel$: Observable<string>;
  private items: MenuItem[];
  private cartSubscription: Subscription;
  private showMessageSubscription: Subscription;

  constructor(private router: Router, private ngRedux: NgRedux<IPizzariumState>, private messageService: MessageService) { }

  ngOnInit() {

    this.messageService.add({severity: 'success', summary: 'Pizzarium', detail: 'Your order was added to the cart'});

    this.items = [
            {label: 'Order', icon: 'fa-rocket', routerLink: ['/order']},
            {label: 'Cart', icon: 'fa-shopping-cart', routerLink: ['/cart']}
        ];
    this.cartSubscription = this.ngRedux.select(state => {

      return state.ui.orders.length > 0
              ? 'Cart (' + state.ui.orders.length + ')'
              : 'Cart';
    }).subscribe(cartLabel => {
      this.items[1].label = cartLabel || 'Cart';
    });

    this.showMessageSubscription = this.ngRedux.select(state => state.ui.message).subscribe(message => {
      this.messageService.add(message);
    });
  }

  // Do not remove this, it is necessary for AutoUnsubscribe
  ngOnDestroy() {}

  navigate (url) {
        this.router.navigateByUrl('/' + url);
  }
}
