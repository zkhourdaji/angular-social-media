import { Pipe, PipeTransform } from '@angular/core';
import { Post, Like } from '../posts';

@Pipe({
  name: 'alreadyLiked'
})
export class AlreadyLiked implements PipeTransform {

  transform(currentUsername: string, post: Post): boolean {
    if (!post.likes) {
      return false;
    } else {
      return post.likes.some((like: Like) => like.username === currentUsername);
    }
  }
}
