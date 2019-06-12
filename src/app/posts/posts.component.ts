import { Component, OnInit, OnDestroy } from '@angular/core';
import { posts, Post } from '../posts';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { PostsService } from '../services/posts.service';

@Component({
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {

  posts: Post[];
  currentUsername: string;
  usernameSubscription: Subscription;
  postsSubscription: Subscription;
  showCommentsOnPostsWithIds = [];

  constructor(private authService: AuthService, private postsService: PostsService) { }

  ngOnInit() {
    this.authService.username.subscribe(username => this.currentUsername = username);
    this.postsService.getAllPosts().subscribe((ps: Post[]) => this.posts = ps);
  }

  onLike(postId: number) {
    this.postsService.likePost(postId);
  }

  onUnlike(postId: number) {
    this.postsService.unlikePost(postId);
  }

  toggleComments(postId: number) {
    const alreadyShowingComments = this.showCommentsOnPostsWithIds.includes(postId);
    if (alreadyShowingComments) {
      this.showCommentsOnPostsWithIds = this.showCommentsOnPostsWithIds.filter(s => s !== postId);
    } else {
      this.showCommentsOnPostsWithIds = [...this.showCommentsOnPostsWithIds, postId];
    }
    console.log(this.showCommentsOnPostsWithIds);
  }

  showComments(postId: number): boolean {
    return this.showCommentsOnPostsWithIds.includes(postId);
  }

  ngOnDestroy() {
    this.usernameSubscription.unsubscribe();
    this.postsSubscription.unsubscribe();
  }

  alreadyLiked(postId: number) {
    return this.postsService.alreadyLiked(postId, this.currentUsername);
  }
}
