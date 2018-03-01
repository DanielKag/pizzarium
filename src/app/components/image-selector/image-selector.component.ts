import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { ImageSelectorItem } from '../../models';
import { trigger, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'image-selector',
   animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateY(50%)', opacity: 0}),
          animate('300ms', style({transform: 'translateY(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({opacity: 1}),
          animate('200ms', style({opacity: 0}))
        ])
      ])],
  template: `    
    <table border=0>      
      <tr *ngFor="let row of dataByRow">
                <td *ngFor="let item of row"  (click)="selectItem(item)" class="item">                
                  <i [@enterAnimation] class="fa fa-check-circle fa-5x checked-item" *ngIf="selectedItems.has(item)" [ngClass]="{'checked-item-multi': multiSelect, 'checked-item-single': !multiSelect}"></i>
                  <img [src]="item.img" [title]="item.value">                 
                </td>
      </tr>
    </table>
  `,
  styleUrls: ['./image-selector.component.css']
})
export class ImageSelectorComponent implements OnChanges {

  @Input() data: ImageSelectorItem[] = [];
  @Input() itemsInRow: number = 5;
  @Input() multiSelect: boolean = false;  
  @Output() selectionChanged: EventEmitter<Set<ImageSelectorItem>> = new EventEmitter<Set<ImageSelectorItem>>()
  public dataByRow: ImageSelectorItem[][] = []
  public selectedItems = new Set();

  ngOnChanges(changes: SimpleChanges) {

    if (changes['data']) {      
      for(let i=0;i<this.data.length;i++){        
          const row = Math.floor(i / this.itemsInRow);
          this.dataByRow[row] = this.dataByRow[row] || [];
          this.dataByRow[row].push(this.data[i]);
        }

        this.clear();        
      }
  }

  public selectItem(item: ImageSelectorItem): void {

    if(this.selectedItems.has(item)) {

      if(this.multiSelect) {
        this.selectedItems.delete(item);
      }
    } else {

      if(!this.multiSelect) {
        this.selectedItems.clear();
      }

      this.selectedItems.add(item);             
    }


    this.selectionChanged.emit(this.selectedItems);
  }

  public clear(): void {
    this.selectedItems.clear();
    if(!this.multiSelect && this.data[0]) {
      this.selectedItems.add(this.data[0])
      this.selectionChanged.emit(this.selectedItems);
    }
  }
}
