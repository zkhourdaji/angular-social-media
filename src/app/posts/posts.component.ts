import { Component, OnInit, OnDestroy } from '@angular/core';
import { posts, Post, Comment, Like } from '../posts';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { PostsService } from '../services/posts.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {

  currentUsername: string;
  usernameSubscription: Subscription;
  postsSubscription: Subscription;



  constructor(private authService: AuthService, private postsService: PostsService) { }

  ngOnInit() {
    this.authService.username.subscribe(username => this.currentUsername = username);

  }


  

}
