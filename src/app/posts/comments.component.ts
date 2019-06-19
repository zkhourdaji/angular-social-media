import { Component, Input, OnInit } from '@angular/core';
import { PortalHostDirective } from '@angular/cdk/portal';
import { FormControl } from '@angular/forms';
import { PostsService } from '../services/posts.service';
import { Comment, Post } from '../posts';
import { from } from 'rxjs';
import { post } from 'selenium-webdriver/http';
import { filter, pluck } from 'rxjs/operators';


@Component({
  selector: 'app-comments-component',
  templateUrl: './comments.component.html'
})
export class CommentsComponent implements OnInit {

  @Input() postId: number;
  comments: Comment[];
  newComment: FormControl = new FormControl('');

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.postsService.getAllPosts().subscribe((posts: Post[]) => {
      from(posts).pipe(
        filter((post: Post) => post.id === this.postId),
        pluck('comments')
        ).subscribe((comments: Comment[]) => this.comments = comments);
    });
  }

  onCommentLike(commentId: number) {
    this.postsService.toggleLikeComment(this.postId, commentId);
  }

  getCommentLikeCount(commentId: number) {
    return this.postsService.getCommentLikeCount(this.postId, commentId);
  }

  onAddComment() {
    const commentText = this.newComment.value;
    this.postsService.addComment(this.postId, commentText);
  }

  isCommentLiked(commentId: number): boolean {
    console.log("commend id: " + commentId);
    return this.postsService.isCommentLiked(this.postId, commentId);
  }
}
