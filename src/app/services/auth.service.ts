import { Injectable } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly user$: Observable<User | null>  = EMPTY;

  constructor(private auth: Auth, private router: Router) {
    if(auth) {
      this.user$ = authState(this.auth);
    }
  }

  async login(email: string, password: string): Promise<void> {
    return await signInWithEmailAndPassword(this.auth, email, password).then(() => {
      this.router.navigate(['']);
    });
  }
}
