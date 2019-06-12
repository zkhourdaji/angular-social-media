import { Routes } from '@angular/router';
import { SignInComponent } from './auth/signin.component';
import { SignUpComponent } from './auth/signup.component';
import { PostsComponent } from './posts/posts.component';
import { AuthGuard } from './services/auth.guard';

export const appRoutes: Routes = [
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'posts', component: PostsComponent, canActivate: [AuthGuard] }
];
