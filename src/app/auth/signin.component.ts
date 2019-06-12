import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './signin.component.html'
})
// This will be a reactive form
export class SignInComponent {

  signinForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private authService: AuthService, private router: Router) { }


  onSubmit() {
    this.authService.signin(this.signinForm.value);
    this.router.navigate(['posts']);
  }
}
