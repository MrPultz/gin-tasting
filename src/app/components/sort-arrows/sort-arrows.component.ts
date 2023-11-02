import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sort-arrows',
  templateUrl: './sort-arrows.component.html',
  styleUrls: ['./sort-arrows.component.css']
})
export class SortArrowsComponent implements OnInit {

  @Input() attr: string = "";
  @Input() currentAttr: string = "";
  @Input() isAsc:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
