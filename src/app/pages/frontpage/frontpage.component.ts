import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Gin } from 'src/app/models/Gin';
import { GinService } from 'src/app/services/gin.service';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription = new Subscription;

  ginOne: Gin | undefined;
  ginTwo: Gin | undefined;
  ginThree: Gin | undefined;

  constructor(private ginService: GinService) { 
    const ginSub = ginService.getTop3Gins().subscribe(gins => {
        this.ginOne = gins[0];
        this.ginTwo = gins[1];
        this.ginThree = gins[2];
    });
    this.subscriptions.add(ginSub);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
