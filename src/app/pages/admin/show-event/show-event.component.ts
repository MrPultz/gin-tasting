import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, forkJoin, mergeMap, take } from 'rxjs';
import { Gin } from 'src/app/models/Gin';
import { eventRating, tastingEvent } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';
import { GinService } from 'src/app/services/gin.service';
import { SortService } from 'src/app/services/sort.service';

@Component({
  selector: 'app-show-event',
  templateUrl: './show-event.component.html',
  styleUrls: ['./show-event.component.css']
})
export class ShowEventComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription = new Subscription;

  event: tastingEvent | undefined;
  ratings: eventRating[] = [];
  activeItemIndex: number = 0;
  sortedGins: Gin[] = [];
  highestVol: Gin[] = [];
  bestPriceLiter: Gin[] = [];
  bestPriceLiterPoints: Gin[] = [];
  QRCodeData = `${window.location.origin}/vote/`;

  constructor(private route: ActivatedRoute, private eventService: EventService, private ginService: GinService, private sort: SortService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id) {
      const eventSub = this.eventService.getEvent(id).subscribe(event => {
        this.event = event;
        this.QRCodeData += event.code    
        this.sortedGins = event.gins.slice();
        this.highestVol = Array.from(event.gins);
        this.bestPriceLiter = Array.from(event.gins);
        this.bestPriceLiterPoints = Array.from(event.gins);
        this.sort.asc(this.highestVol, "vol", true);  
        this.sort.desc(this.bestPriceLiter, "valuePerLiter", true);
      });
      this.subscriptions.add(eventSub);
      const ratingSub = this.eventService.getRatings(id).subscribe(ratings => {
        this.calculateRating(ratings);
        this.sort.asc(this.sortedGins, "avgPoints", true);
        this.sort.desc(this.bestPriceLiterPoints, "valueLiterPoint", true);
        // this.sortArray();
      });
      this.subscriptions.add(ratingSub);
    }
  }

  ngOnDestroy(): void {
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
      gin.valueLiterPoint = gin.valuePerLiter / gin.avgPoints;
      this.ratings.push(rating);
    }

  }

  previousItem() {
    if(!this.event) {
      return;
    }
    this.activeItemIndex = this.activeItemIndex === 0 ? this.event?.gins.length - 1 : this.activeItemIndex - 1;
  }
  
  nextItem() {
    if(!this.event) {
      return;
    }
    this.activeItemIndex = this.activeItemIndex === this.event?.gins.length - 1 ? 0 : this.activeItemIndex + 1; 
  }
  
  finishEvent() {
    if(!this.event) {
      return;
    }
    const updateObservables: Observable<void>[] = [];

    for(let gin of this.event.gins) {
      if(!gin.id) {
        continue;
      }
      
      const updateObservable = this.ginService.getGin(gin.id).pipe(
        take(1), // Ensure the inner observable completes after emitting one value
        mergeMap(globalGin => {
          globalGin.id = gin.id;
          globalGin.votes = globalGin.votes === 0 ? gin.votes : globalGin.votes + gin.votes;
          globalGin.avgPoints = globalGin.avgPoints === 0 ? gin.avgPoints : (globalGin.avgPoints + gin.avgPoints) / 2;
          globalGin.valueLiterPoint = globalGin.valuePerLiter / globalGin.avgPoints;
          return this.ginService.updateGin(globalGin);
        })
      );
      updateObservables.push(updateObservable);
    }

    const forkSub = forkJoin(updateObservables).subscribe();
    this.subscriptions.add(forkSub);
  }
}
