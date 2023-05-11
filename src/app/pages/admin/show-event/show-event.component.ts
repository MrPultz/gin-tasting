import { Component, OnInit } from '@angular/core';
import { idToken } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Gin } from 'src/app/models/Gin';
import { eventRating, tastingEvent } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-show-event',
  templateUrl: './show-event.component.html',
  styleUrls: ['./show-event.component.css']
})
export class ShowEventComponent implements OnInit {

  private subscriptions: Subscription = new Subscription;

  event: tastingEvent | undefined;
  ratings: eventRating[] = [];
  activeItemIndex: number = 0;
  sortedGins: Gin[] = [];

  constructor(private route: ActivatedRoute, private eventService: EventService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id) {
      const eventSub = this.eventService.getEvent(id).subscribe(event => {
        this.event = event;
        this.sortedGins = event.gins.slice();
      });
      this.subscriptions.add(eventSub);
      const ratingSub = this.eventService.getRatings(id).subscribe(ratings => {
        this.calculateRating(ratings);
        this.sortArray();
      });
      this.subscriptions.add(ratingSub);
    }
  }

  ngOnDestory(): void {
    this.subscriptions.unsubscribe();
  }

  sortArray() {
    this.sortedGins.sort((a,b) => b.avgPoints - a.avgPoints);
  }

  calculateRating(_ratings: eventRating[]): void {
    for(let currentRating of this.ratings) {
      for(let [index, newRating] of _ratings.entries()) {
        if(newRating.id !== currentRating.id) {
          continue;
        }
        _ratings.splice(index, 1);
      }
    }
    for(let rating of _ratings) {
      const gin = this.event?.gins.find(gin => gin.name === rating.name);
      if(gin == null) {
        continue;
      }
      gin.votes++;
      gin.avgPoints = ((gin.avgPoints * (gin.votes - 1)) + rating.rating) / gin.votes;
      gin.valuePerLiter = (gin.price / gin.cl) * 100;
      gin.valueLiterPoint = gin.valuePerLiter / gin.avgPoints;
      this.ratings.push(rating);
    }

  }
  previousItem() {
    this.activeItemIndex = this.activeItemIndex === 0 ? this.eventService.getEvents.length - 1 : this.activeItemIndex - 1;
  }
  
  nextItem() {
    this.activeItemIndex = this.activeItemIndex === this.eventService.getEvents.length - 1 ? 0 : this.activeItemIndex + 1;
  }
}
