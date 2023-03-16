import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Gin } from 'src/app/models/Gin';
import { GinService } from 'src/app/services/gin.service';

@Component({
  selector: 'app-top10',
  templateUrl: './top10.component.html',
  styleUrls: ['./top10.component.css']
})
export class Top10Component implements OnInit {

  gins: Observable<Gin[]> = EMPTY;

  constructor(private ginService:GinService) { }

  ngOnInit(): void {
    this.gins = this.ginService.getTop10Gins();
  }

}
