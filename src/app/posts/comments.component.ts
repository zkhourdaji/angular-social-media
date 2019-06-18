import { Component, Input, OnInit } from '@angular/core';
import { PortalHostDirective } from '@angular/cdk/portal';
import { FormControl } from '@angular/forms';
import { PostsService } from '../services/posts.service';
import { Comment } from '../posts';


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
    //this.comments = this.postsService.getCommentsByPostId(this.postId);

    this.postsService.getComomentsByPostId(this.postId).subscribe(
      (comments: Comment[]) => this.comments = comments
    );
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
