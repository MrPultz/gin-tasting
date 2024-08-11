import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { tastingEvent } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription = new Subscription;

  event: tastingEvent | undefined;
  eventCode: string[] = ["", "", "", ""];
  codeError: boolean = false;

  constructor(private eventService: EventService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('code');
    if(code) {
      this.getEvent(+code)
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  keyDown(e: KeyboardEvent) {
    const key: number = +e.key;

    if (e.key === "Backspace" || (key >= 0 && key <= 9)) {
      this.codeError = false;
      return true;
    }

    e.preventDefault();
    return false;
  }

  goToNextInput(e: KeyboardEvent) {
    const key: number = +e.key;
    const t: any = e.target;
    const sib = t.nextSibling;
    const sibName = sib.nodeName.toLowerCase();
    const nodeName = "input";

    if (sibName !== nodeName && (this.eventCode[3] !== "" && this.eventCode[3] != null)) {
      if (e.key === "Enter") {
        this.getEventClick();
      }
      return false;
    }

    if (e.key !== "Backspace" && isNaN(key)) {
      e.preventDefault();
      return false;
    }

    if (e.key === "Backspace") {
      return true;
    }
    if (sibName === nodeName) {
      sib.select();
    }
    return false;
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }
  
  getEventClick(): void {
    const eventCode = +this.eventCode.join('');
    this.getEvent(eventCode);
  }

  private getEvent(eventCode: number) {
    if(this.event) {
      return;
    }
    if (eventCode.toString().length !== 4 || isNaN(eventCode)) {
      this.codeError = true;
      return;
    }
    const eventSub = this.eventService.getEventByCode(eventCode).subscribe(events => {
      const event = events[0];
      if(!event) 
        this.codeError = true;
      else
        this.event = event;
    });
    this.subscriptions.add(eventSub);
  }

}