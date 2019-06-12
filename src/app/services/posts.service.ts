import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Post, posts } from '../posts';
import { BehaviorSubject, Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable()
export class PostsService {

  private postsSubject: BehaviorSubject<Post[]>;
  private posts: Post[] = posts;
  constructor(private authService: AuthService) {
    this.postsSubject = new BehaviorSubject<Post[]>(this.posts);

  }

  alreadyLiked(postId: number, username: string) {
    const post = posts.find(p => p.id === postId);
    if (post.likes && post.likes.some(l => l.username === username)) {
      return true;
    }
    return false;
  }

  // get value from behavioral subject
  likePost(postId: number) {
    // first() automatically unsubscribes after first emitted value
    const subscription = this.authService.username.pipe(first()).subscribe(username => {
      const post = this.posts.find(p => p.id === postId);
      // dont do anything if user alreadly liked this post
      if (this.alreadyLiked(postId, username)) {
        return;
      }
      post.likes = [...post.likes, { username }];
      this.postsSubject.next(this.posts);
    });

  }

  unlikePost(postId: number) {
    // first() automatically unsubscribes after first emitted value
    const subscription = this.authService.username.pipe(first()).subscribe(username => {
      const post = this.posts.find(p => p.id === postId);
      // dont do anything if user alreadly liked this post
      if (!this.alreadyLiked(postId, username)) {
        return;
      }
      post.likes = post.likes.filter(l => l.username !== username);
      this.postsSubject.next(this.posts);
    });
  }

  getAllPosts(): Observable<Post[]> {
    return this.postsSubject.asObservable();
  }

  updatePost(postId: number) {

  }

  addComment(postId: number) {

  }

  deleteComment(postId: number, commentId: number) {

  }
}
