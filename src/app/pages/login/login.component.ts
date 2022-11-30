import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });
  loginError: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  login():void {
    if(!this.loginForm.value.email || !this.loginForm.value.password) {
      this.loginError = 'Please fill in email and password';
      return
    }
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).then(() => {
      this.loginError = '';
      this.loginForm.reset();
    }).catch(err => this.loginError = 'The Email or Password are incorrect.');
  }

}
