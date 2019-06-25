import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post, Like, Comment } from '../posts';
import { PostsService } from '../services/posts-service/posts.service';
import { AuthService } from '../services/auth-service/auth.service';
import { Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-posts-list-component',
  templateUrl: './posts-list.component.html'
})
export class PostsListComponent implements OnInit, OnDestroy {

  private postsSubscription: Subscription;
  private posts: Post[];

  constructor(private postsService: PostsService, private authService: AuthService) { }

  ngOnInit() {
    this.postsSubscription = this.postsService.getAllPosts().subscribe((ps: Post[]) => {
      this.posts = ps.sort(this.compareDates);
      for (const post of this.posts) {
        this.sortComments(post);
      }
    });
  }

  // newest first
  compareDates(a: any, b: any) {
    if (a.date > b.date) {
      return -1;
    } else if (a.date < b.date) {
      return 1;
    } else {
      return 0;
    }
  }

  sortComments(post: Post) {
    if (post.comments) {
      post.comments = post.comments.sort(this.compareDates);
    }
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }
}
