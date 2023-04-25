import { Component, Input, OnInit } from '@angular/core';
import { Gin } from 'src/app/models/Gin';
import { eventRating } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'gin-event-card',
  templateUrl: './gin-event-card.component.html',
  styleUrls: ['./gin-event-card.component.css']
})
export class GinEventCardComponent implements OnInit {

  @Input() gin: Gin | undefined = undefined;
  @Input() eventID: string;

  hasRated: boolean = false;

  constructor(private eventService: EventService) {
    this.eventID = "";
  }

  ngOnInit(): void {
  }

  giveRating(_rating: string): void {
    if(!this.gin) {
      return;
    }
    const rating: eventRating = {
      name: this.gin?.name,
      rating: +_rating,
    }
    this.eventService.giveGinRating(this.eventID, rating);
    this.hasRated = true;
  }

}
