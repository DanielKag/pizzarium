import { Component, OnInit, Input } from '@angular/core';
import {Pizza} from '../../../models';

@Component({
  selector: 'app-pizza-details',
  template: `
    <p>
      {{pizza | json}}
    </p>
  `,
  styleUrls: ['./pizza-details.component.css']
})
export class PizzaDetailsComponent implements OnInit {

  @Input() pizza: Pizza;

  constructor() { }

  ngOnInit() {
  }

}
