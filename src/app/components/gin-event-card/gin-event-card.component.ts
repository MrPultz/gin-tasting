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

  @Input() gin: Gin | undefined;
  @Input() eventID: string | undefined;

  rating: number = 0;
  ratingValue: number[] = [1,2,3,4,5];

  hasRated: boolean = false;

  constructor(private eventService: EventService) {
  }

  ngOnInit(): void {
    if(this.gin != null) {
      const rating = localStorage.getItem(this.gin.name);
      console.log(rating);
      if(rating) {
        this.rating = +rating;
        this.hasRated = true;
      }
    }
  }

  giveRating(): void {
    if(!this.gin || this.eventID == null) {
      return;
    }
    const rating: eventRating = {
      name: this.gin?.name,
      rating: this.rating,
    }
    this.eventService.giveGinRating(this.eventID, rating);
    this.hasRated = true;
    localStorage.setItem(this.gin.name, this.rating.toString());
  }

  setRating(value: number): void {
    for(let number of this.ratingValue) {
      if(number == value) {
        document.querySelector(`#rating-${number}`)?.classList.toggle("active");
      } else {
        document.querySelector(`#rating-${number}`)?.classList.remove("active");
      }
    }
    this.rating = value;
  }

}
