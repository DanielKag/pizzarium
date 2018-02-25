import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-select-toppings',
  template: `
  <h3> Select Toppings: </h3>
    <div class="select-toppings-container">
      <p-selectButton [options]="toppings" [(ngModel)]="selectedToppings" multiple="true"></p-selectButton>
    </div>

    <div>
      <p-toggleButton onLabel="I confirm" offLabel="I reject"></p-toggleButton>
    </div>
  `,
  styleUrls: ['./select-toppings.component.css']
})
export class SelectToppingsComponent implements OnInit {

public toppings: SelectItem[];
public selectedToppings: string[] = [];

  constructor() { 
    this.toppings = [
          {label:'Olives', value:"Olives", icon:"fa fa-asterisk"},
          {label:'Pineapples', value:"Pineapples", icon:"fa fa-asterisk"},
          {label:'Mushrooms', value:"Mushrooms", icon:"fa fa-asterisk"},
          {label:'Tomatoes', value:"Tomatoes", icon:"fa fa-asterisk"},
          {label:'Olives', value:"Olives1", icon:"fa fa-asterisk"},
          {label:'Pineapples', value:"Pineapples1", icon:"fa fa-asterisk"},
          {label:'Mushrooms', value:"Mushrooms1", icon:"fa fa-asterisk"},
          {label:'Tomatoes', value:"Tomatoes1", icon:"fa fa-asterisk"},
          {label:'Olives', value:"Olives2", icon:"fa fa-asterisk"},
          {label:'Pineapples', value:"Pineapples2", icon:"fa fa-asterisk"},
          {label:'Mushrooms', value:"Mushrooms2", icon:"fa fa-asterisk"},
          {label:'Tomatoes', value:"Tomatoes2", icon:"fa fa-asterisk"},
          {label:'Olives', value:"Olives3", icon:"fa fa-asterisk"},
          {label:'Pineapples', value:"Pineapples3", icon:"fa fa-asterisk"},
          {label:'Mushrooms', value:"Mushrooms3", icon:"fa fa-asterisk"},
          {label:'Tomatoes', value:"Tomatoes3", icon:"fa fa-asterisk"},
      ];
  }

  ngOnInit() {
  }

}
