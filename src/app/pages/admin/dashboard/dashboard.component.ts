import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tastingEvent } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  events$: Observable<tastingEvent[]>

  constructor(private eventService: EventService) { 
    this.events$ = eventService.getEvents();
  }

  ngOnInit(): void {
  }

}
