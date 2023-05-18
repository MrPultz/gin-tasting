import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {

  joinEventForm = new FormGroup({
    email: new FormControl('', [
      Validators.required
    ])
  })

  constructor() { }

  ngOnInit(): void {
  }

joinEvent(){
  //Do what is needed here for the event thing when button pressed.
}

}
