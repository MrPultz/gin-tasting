import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tastingEvent } from 'src/app/models/event';
import { Gin } from 'src/app/models/Gin';
import { EventService } from 'src/app/services/event.service';
import { GinService } from 'src/app/services/gin.service';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  createEventForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ])
  });

  gins$: Observable<Gin[]>;
  selectedGins: Gin[];

  constructor(private eventService: EventService, private ginService: GinService) {
    this.gins$ = this.ginService.getGins();
    this.selectedGins = [];
  }

  ngOnInit(): void {
  }

  submit():void {
    if(!this.createEventForm.value.name) {
      return;
    }
    for(let gin of this.selectedGins) {
      gin.avgPoints = 0;
      gin.valueLiterPoint = 0;
      gin.valuePerLiter = 0;
      gin.votes = 0;
    }
    const event: tastingEvent = {
      name: this.createEventForm.value.name,
      gins: this.selectedGins,
      date: new Date(),
      code: this.generateCode(),
    };
    this.eventService.createEvent(event);
    this.createEventForm.reset();
    document.querySelectorAll('.gin.selected').forEach(el => {
      el.classList.remove('selected');
    });
    this.selectedGins.length = 0;
  }

  selectGin(event: any, gin: Gin): void {
    // remove gin
    if(event.target.classList.contains('selected')) {
      this.removeGinFromList(gin);
    } else {
      // add gin
      this.addGinToList(gin);
    }
    
    event.target.classList.toggle('selected');
  }

  private generateCode(): number {
    return Math.floor(1000 + Math.random() * 9000);
  }

  private addGinToList(gin: Gin): void {
    if(gin == null) {
      return;
    }
    this.selectedGins.push(gin);
  }

  private removeGinFromList(gin: Gin): void {
    if(gin == null) {
      return;
    }

    const index = this.selectedGins.findIndex(_gin => _gin === gin);
    if(index < 0) {
      return;
    }
    this.selectedGins.splice(index, 1);
  }

}
