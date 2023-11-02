import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Gin } from 'src/app/models/Gin';
import { GinService } from 'src/app/services/gin.service';
import { SortService } from 'src/app/services/sort.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription = new Subscription;
  private prevAttr: string = "";
  currentAttr: string = "";
  isAsc: boolean = true;
  gins: Gin[] = [];

  constructor(private ginService: GinService, private sort: SortService) {
    const sub = ginService.getGins().subscribe(gins => {
      this.gins = gins;
    });
    this.subscriptions.add(sub)
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void { 
    this.subscriptions.unsubscribe();
  }

  sortCell(attr: string): void {
    const gin:Gin = this.gins[0];
    const isNumber = !isNaN(gin[attr]);
    this.currentAttr = attr;
    
    if(this.currentAttr !== this.prevAttr) {
      this.sort.asc(this.gins, attr, isNumber);
      this.prevAttr = this.currentAttr;
      this.isAsc = true;
      return;
    }
    if(this.isAsc) {
      this.sort.desc(this.gins, attr, isNumber);
    } else {
      this.sort.asc(this.gins, attr, isNumber);
    }
    this.isAsc = !this.isAsc;
  }
}
