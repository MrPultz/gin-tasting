import { Component, OnInit } from '@angular/core';
import { idToken } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tastingEvent } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-show-event',
  templateUrl: './show-event.component.html',
  styleUrls: ['./show-event.component.css']
})
export class ShowEventComponent implements OnInit {

  event$: Observable<tastingEvent> | undefined = undefined;
  activeItemIndex = 0;

  constructor(private route: ActivatedRoute, private eventService: EventService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id)
      this.event$ = this.eventService.getEvent(id);
  }

  previousItem() {
    this.activeItemIndex = this.activeItemIndex === 0 ? this.eventService.getEvents.length - 1 : this.activeItemIndex - 1;
  }
  
  nextItem() {
    this.activeItemIndex = this.activeItemIndex === this.eventService.getEvents.length - 1 ? 0 : this.activeItemIndex + 1;
  }
}
