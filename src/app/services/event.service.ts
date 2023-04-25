import { Injectable } from '@angular/core';
import { DocumentData, QueryDocumentSnapshot, SnapshotOptions } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { eventRating, tastingEvent } from '../models/event';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private readonly eventPath = "/Events";
  private readonly eventConverter = {
    toFirestore(event: tastingEvent): DocumentData {
      return {name: event.name, gins: event.gins, date: event.date, code: event.code}
    },
    fromFirestore(snapshot: QueryDocumentSnapshot<tastingEvent>, options?: SnapshotOptions): tastingEvent {
      const data = snapshot.data(options);
      return data 
    }
  }

  private readonly ratingConverter = {
    toFirestore(rating: eventRating): DocumentData {
      return {name: rating.name, rating: rating.rating}
    },
    fromFirestore(snapshot: QueryDocumentSnapshot<eventRating>, options?: SnapshotOptions): eventRating {
      const data = snapshot.data(options);
      return data 
    }
  }

  constructor(private dbService: DbService) { }

  createEvent(event: tastingEvent): void {
    this.dbService.add(event, this.eventPath, this.eventConverter);
  }

  getEvents(): Observable<tastingEvent[]> {
    return this.dbService.getAll(this.eventPath, this.eventConverter);
  }

  getEvent(id: string): Observable<tastingEvent> {
    return this.dbService.getDoc(`${this.eventPath}/${id}`, this.eventConverter);
  }

  getEventByCode(code: string): Observable<tastingEvent[]> {
    return this.dbService.getByField(code, this.eventPath, this.eventConverter);
  }

  giveGinRating(eventID: string, rating: eventRating): void {
    this.dbService.add(rating, `${this.eventPath}/${eventID}/Ratings/`, this.ratingConverter);
  }

  getRatings(eventID: string): Observable<eventRating[]> {
    return this.dbService.getAll(`${this.eventPath}/${eventID}/Ratings/`, this.ratingConverter);
  } 
}
