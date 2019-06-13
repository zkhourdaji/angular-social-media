import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit, OnDestroy {

  public username: string;
  private usernameSubscription: Subscription;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.usernameSubscription = this.authService.username.subscribe(username => this.username = username);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  ngOnDestroy() {
    this.usernameSubscription.unsubscribe();
  }

}
