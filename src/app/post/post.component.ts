import { Component, Input, OnInit } from '@angular/core';
import { Post, Comment, Like } from '../posts';
import { PostsService } from '../services/posts-service/posts.service';
import { AuthService } from '../services/auth-service/auth.service';

@Component({
  selector: 'app-post-component',
  templateUrl: './post.component.html'
})
export class PostComponent implements OnInit {

  @Input() postId: number;
  post: Post;
  liked: boolean;
  showComments: boolean;

  constructor(private postsService: PostsService, private authService: AuthService) {

  }

  ngOnInit() {
    this.post = this.postsService.getPostById(this.postId);
    if (this.post.likes) {
      this.liked = this.post.likes.some(
        (l: Like) => l.username === this.authService.getCurrentUserName()
      );
    }

    this.showComments = false;
  }


  onPostLike(postId: number) {
    this.postsService.likePost(postId);
    this.liked = true;
  }

  onPostUnlike(postId: number) {
    this.postsService.unlikePost(postId);
    this.liked = false;
  }


  toggleComments() {
    this.showComments = !this.showComments;
  }


}
