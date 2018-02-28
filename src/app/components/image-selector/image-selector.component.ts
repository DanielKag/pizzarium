import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {ImageSelectorItem} from '../../models';
import { trigger, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'image-selector',
   animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ])],
  template: `    
    <table border=0>      
      <tr *ngFor="let row of dataByRow">
                <td *ngFor="let item of row"  (click)="selectItem(item)" style="position:relative">                
                  <i [@enterAnimation] class="fa fa-check-circle fa-5x" *ngIf="selectedItems.has(item)" style="color: #24d224;position:absolute; top: 10px; left: 10px"></i>
                  <img [src]="item.img">                  
                </td>
      </tr>
    </table>
  `,
  styleUrls: ['./image-selector.component.css']
})
export class ImageSelectorComponent implements OnInit, OnChanges {

  @Input() data: ImageSelectorItem[] = [];
  @Input() itemsInRow: number = 5;
  @Input() multiSelect: boolean = false;
  @Output() selectionChanged: EventEmitter<Set<ImageSelectorItem>> = new EventEmitter<Set<ImageSelectorItem>>()
  public dataByRow: ImageSelectorItem[][] = []
  public selectedItems = new Set();

  constructor() {    
   }

  ngOnInit() {     
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes['data']) {
      for(let i=0;i<this.data.length;i++){        
          const row = Math.floor(i / this.itemsInRow);
          this.dataByRow[row] = this.dataByRow[row] || [];
          this.dataByRow[row].push(this.data[i]);
        }
     }
  }

  selectItem(item: string) {

    if(this.selectedItems.has(item)) {
      this.selectedItems.delete(item);
    } else {

      if(!this.multiSelect) {
        this.selectedItems.clear();
      }

      this.selectedItems.add(item);
    }    

    this.selectionChanged.emit(this.selectedItems);
  }

  clear() {
    this.selectedItems.clear();
  }
 
}
