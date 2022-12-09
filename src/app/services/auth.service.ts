import { Injectable } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { EMPTY, Observable, switchMap } from 'rxjs';
import { User } from '../models/user';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly user$: Observable<User>  = EMPTY;

  constructor(private auth: Auth, private db: DbService, private router: Router) {
    if(auth) {
      this.user$ = authState(this.auth).pipe(switchMap(user => {
        if(user) 
          return db.getUser(user?.uid);
        return EMPTY;
      }));
    }
  }

  async login(email: string, password: string): Promise<void> {
    return await signInWithEmailAndPassword(this.auth, email, password).then(() => {
      this.router.navigate(['']);
    });
  }

  async logout(): Promise<void> {
    return await signOut(this.auth).then(() => {
      this.router.navigate(['login']);
    });
  }
}
