import { Component, OnInit, OnDestroy } from '@angular/core';
import { posts, Post, Comment, Like } from '../posts';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { PostsService } from '../services/posts.service';
import { FormControl } from '@angular/forms';

@Component({
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {

  posts: Post[];
  currentUsername: string;
  usernameSubscription: Subscription;
  postsSubscription: Subscription;
  showCommentsOnPostsWithIds = [0];
  likedPosts = [];
  newComment: FormControl = new FormControl('');

  constructor(private authService: AuthService, private postsService: PostsService) { }

  ngOnInit() {
    this.authService.username.subscribe(username => this.currentUsername = username);
    this.postsService.getAllPosts().subscribe((ps: Post[]) => {
      this.posts = ps.sort(this.compareDates);
      for (const post of this.posts) {
        this.sortComments(post);
      }
    });
  }

  sortComments(post: Post) {
    if (post.comments) {
      post.comments = post.comments.sort(this.compareDates);
    }
  }

  isCommentLiked(postId: number, commentId: number): boolean {
    const post = this.posts.find((p: Post) => p.id === postId);
    if (post.comments) {
      const comment = post.comments.find((c: Comment) => c.id === commentId);
      return (comment.likes && comment.likes.some((l: Like) => l.username === this.currentUsername));
    }
    return false;
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

  getCommentLikeCount(postId: number, commentId: number) {
    const post = this.posts.find((p: Post) => p.id === postId);
    const comment = post.comments.find((c: Comment) => c.id === commentId);
    return comment.likes ? comment.likes.length : 0;
  }

  // TODO: rename to onPostLike
  onPostLike(postId: number) {
    this.postsService.likePost(postId);
  }

  onCommentLike(postId: number, commentId: number) {
    this.postsService.toggleLikeComment(postId, commentId);
  }

  // TODO: rename to onPostUnlike
  onPostUnlike(postId: number) {
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

  onAddComment(postId: number) {
    const commentText = this.newComment.value;
    this.postsService.addComment(postId, commentText);
    console.log(this.posts.find(p => p.id === postId).comments);
  }
}
