import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {

  private usernameSubject = new BehaviorSubject<string>(null);
  private currentUserName: string = null;

  isAuthenticated() {
    return !!this.currentUserName;
  }

  getCurrentUserName() {
    return this.currentUserName;
  }

  logout() {
    this.currentUserName = null;
    this.usernameSubject.next(this.currentUserName);
  }

  // TODO: implement sign in
  signin(formValues: { username: string, password: string }) {
    const { username, password } = formValues;
    this.currentUserName = username;
    this.usernameSubject.next(this.currentUserName);
  }

  get username(): Observable<string> {
    return this.usernameSubject.asObservable();
  }

}
