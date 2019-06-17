import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  @Output() public sidenavToggle = new EventEmitter();

  public username: string;
  private usernameSubscription: Subscription;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.usernameSubscription = this.authService.username.subscribe(username => this.username = username);
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  ngOnDestroy() {
    this.usernameSubscription.unsubscribe();
  }

}
