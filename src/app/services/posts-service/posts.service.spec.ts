import { PostsService } from './posts.service';
import { AuthService } from '../auth-service/auth.service';
import { Observable } from 'rxjs';
import { Post, NewPost } from 'src/app/posts';

describe('Posts Service', () => {

  let postsService: PostsService;
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
    spyOn(authService, 'getCurrentUserName').and.returnValue('Zafer');
    postsService = new PostsService(authService);
  });

  it('Should return posts observable', () => {
    const postsObservable = postsService.getAllPosts();
    expect(postsObservable).toEqual(jasmine.any(Observable));
  });

  it('Should clear posts', (done) => {
    postsService.clearPosts();
    const postsObservable = postsService.getAllPosts();
    postsObservable.subscribe((emittedPosts: Post[]) => {
      expect(emittedPosts).toEqual([]);
      done();
    });
  });

  it('Should add post', async () => {
    authService.logout();
    authService.signin({ username: 'Zafer', password: 'Password' });
    postsService.clearPosts();
    postsService.addPost({
      body: 'Test post body',
      title: 'Test post title'
    } as NewPost);

    let posts;
    postsService.getAllPosts().subscribe((emittedPosts: Post[]) => {
      posts = emittedPosts;
      // done();
    });
    expect(posts.length).toBe(1);
  });

  it('Should get post by id', (done) => {

    authService.logout();
    authService.signin({ username: 'Zafer', password: 'Password' });
    postsService.clearPosts();
    postsService.addPost({
      body: 'Test post body',
      title: 'Test post title'
    } as NewPost);
    const post: Post = postsService.getPostById(0);
    expect(post).toBeDefined();
    expect(post.title).toBe('Test post title');
    expect(post.body).toBe('Test post body');
    done();
  });

});
