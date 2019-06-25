import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../services/auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
// This will be a reactive form
export class SignInComponent {

  signinForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ])
  });

  constructor(private authService: AuthService, private router: Router) { }

  get username(): AbstractControl {
    return this.signinForm.get('username');
  }

  get password(): AbstractControl {
    return this.signinForm.get('password');
  }

  isInvalid(formControl: AbstractControl): boolean {
    return !formControl.valid && (formControl.dirty || formControl.touched);

  }

  requiredCheck(formControl: AbstractControl): boolean {
    return this.isInvalid(formControl) && formControl.errors.required;
  }

  minLengthCheck(formControl: AbstractControl): boolean {
    return this.isInvalid(formControl) && formControl.errors.minlength;
  }

  onSubmit() {
    this.authService.signin(this.signinForm.value);
    this.router.navigate(['posts']);
  }
}
