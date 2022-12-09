import { Component, Input, OnInit } from '@angular/core';
import { Gin } from 'src/app/models/Gin';

@Component({
  selector: 'gin-render',
  templateUrl: './gin-render.component.html',
  styleUrls: ['./gin-render.component.css']
})
export class GinRenderComponent implements OnInit {

  @Input() gin: Gin | undefined = undefined

  constructor() { }

  ngOnInit(): void {
  }

}
