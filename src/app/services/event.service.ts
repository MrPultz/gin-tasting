import { Injectable } from '@angular/core';
import { DocumentData, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { tastingEvent } from '../models/event';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private readonly eventPath = "/Events";
  private readonly eventConverter = {
    toFirestore(event: tastingEvent): DocumentData {
      return {name: event.name, gins: event.gins, date: event.date}
    },
    fromFirestore(snapshot: QueryDocumentSnapshot<tastingEvent>, options: any): tastingEvent {
      const data = snapshot.data(options)!;
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
}
