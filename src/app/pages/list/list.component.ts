import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Gin } from 'src/app/models/Gin';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  gins: Observable<Gin[]>;

  constructor(private dbService: DbService) {
    this.gins = dbService.getGins();
  }

  ngOnInit(): void {
  }

}
