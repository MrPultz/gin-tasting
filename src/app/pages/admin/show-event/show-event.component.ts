import { Component, OnInit } from '@angular/core';
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

  constructor(private route: ActivatedRoute, private eventService: EventService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id)
      this.event$ = this.eventService.getEvent(id);
  }

}
