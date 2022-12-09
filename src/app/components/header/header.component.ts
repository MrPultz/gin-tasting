import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { EMPTY, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: Observable<User | null> = EMPTY;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.user$;
  }

  logout(): void {
    this.authService.logout();
  }
}
