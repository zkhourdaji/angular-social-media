import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PostsService } from '../services/posts-service/posts.service';

@Component({
  selector: 'app-new-post-form-component',
  templateUrl: './new-post.component.html'
})
export class NewPostComponent {

  constructor(private postsService: PostsService) { }

  newPost: FormGroup = new FormGroup({
    title: new FormControl(''),
    body: new FormControl('')
  });


  onAddPost() {
    this.postsService.addPost({
      title: this.newPost.controls.title.value,
      body: this.newPost.controls.body.value
    });
  }
}
