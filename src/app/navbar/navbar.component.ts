import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit, OnDestroy {

  public username: string;
  private usernameSubscription: Subscription;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.usernameSubscription = this.authService.username.subscribe(username => this.username = username);
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.usernameSubscription.unsubscribe();
  }

}
