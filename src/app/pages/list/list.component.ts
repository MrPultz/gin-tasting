import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Gin } from 'src/app/models/Gin';
import { GinService } from 'src/app/services/gin.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  gins: Observable<Gin[]>;

  constructor(private ginService: GinService) {
    this.gins = ginService.getGins();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

  }

}
