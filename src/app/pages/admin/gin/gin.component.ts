import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-gin',
  templateUrl: './gin.component.html',
  styleUrls: ['./gin.component.css']
})
export class GinComponent implements OnInit {

  addGinForm = new FormGroup({
    ginName: new FormControl('', [

    ])
  });



  constructor() { }

  ngOnInit(): void {
  }

  submit():void {
    console.log("You pressed submit button")
  }

}
