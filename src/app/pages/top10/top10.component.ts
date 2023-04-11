import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Gin } from 'src/app/models/gin';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-top10',
  templateUrl: './top10.component.html',
  styleUrls: ['./top10.component.css']
})
export class Top10Component implements OnInit {

  gins: Observable<Gin[]> = EMPTY;

  constructor(private db:DbService) { }

  ngOnInit(): void {
    this.gins = this.db.getTop10Gins();
  }

}
