import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Post, posts, Comment, Like } from '../posts';
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

  // TODO: get value from behavioral subject
  likePost(postId: number) {
    // first() automatically unsubscribes after first emitted value
    this.authService.username.pipe(first()).subscribe(username => {
      const post = this.posts.find(p => p.id === postId);
      // dont do anything if user alreadly liked this post
      if (this.alreadyLiked(postId, username)) {
        return;
      }
      post.likes = [...post.likes, { username }];
      this.postsSubject.next(this.posts);
    });
  }

  toggleLikeComment(postId: number, commentId: number) {
    const currentUsername = this.authService.getCurrentUserName();
    const postComments: Comment[] = this.posts.find(p => p.id === postId).comments;
    const comment = postComments.find((c: Comment) => c.id === commentId);
    if (comment.likes && comment.likes.some((l: Like) => l.username === currentUsername)) {
      comment.likes = comment.likes.filter((l: Like) => l.username !== currentUsername)
    } else {
      comment.likes = [...(comment.likes || []), { username: currentUsername }];
    }
    this.postsSubject.next(this.posts);
    // console.log(comment.likes);
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

  addComment(postId: number, comment: string): void {
    const username = this.authService.getCurrentUserName();
    const post = this.posts.find(p => p.id === postId);
    post.comments.push({
      id: 99,
      username,
      body: comment,
      date: new Date()
    });
    this.postsSubject.next(this.posts);
  }

  deleteComment(postId: number, commentId: number) {

  }
}
