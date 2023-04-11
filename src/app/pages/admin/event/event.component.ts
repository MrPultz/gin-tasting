import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  createEventForm = new FormGroup({
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
