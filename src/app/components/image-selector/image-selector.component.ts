import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ImageSelectorItem} from '../../../models';

@Component({
  selector: 'image-selector',
  template: `  
    <table border=0>  
      <tr *ngFor="let row of dataByRow">
                <td *ngFor="let item of row" [ngClass]="{'selected-image':selectedItems.has(item)}" (click)="selectItem(item)">
                  <img [src]="item.img">
                </td>
      </tr>
    </table>
  `,
  styleUrls: ['./image-selector.component.css']
})
export class ImageSelectorComponent implements OnInit {

  @Input() data: ImageSelectorItem[] = [];
  @Input() itemsInRow: number = 5;
  @Input() multiSelect: boolean = false;
  @Output() selectionChanged: EventEmitter<Set<ImageSelectorItem>> = new EventEmitter<Set<ImageSelectorItem>>()
  public dataByRow: ImageSelectorItem[][] = []
  public selectedItems = new Set();

  constructor() {    
   }

  ngOnInit() {    

      for(let i=0;i<this.data.length;i++){        
        const row = Math.floor(i / this.itemsInRow);
        this.dataByRow[row] = this.dataByRow[row] || [];
        this.dataByRow[row].push(this.data[i]);
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

    //console.log(this.selectedItems)
    this.selectionChanged.emit(this.selectedItems);
  }
 
}
