import { Component, Input, OnInit } from '@angular/core';
import { Gin } from 'src/app/models/Gin';

@Component({
  selector: 'app-gin-render-big',
  templateUrl: './gin-render-big.component.html',
  styleUrls: ['./gin-render-big.component.css']
})
export class GinRenderBigComponent implements OnInit {

  @Input() gin: Gin | undefined = undefined

  constructor() { }

  ngOnInit(): void {
  }

}
