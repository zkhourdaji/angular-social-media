import { Routes } from '@angular/router';
import { SignInComponent } from './auth/signin.component';
import { SignUpComponent } from './auth/signup.component';
import { AuthGuard } from './services/auth.guard';
import { PostsContainerComponent } from './posts/posts-container.component';

export const appRoutes: Routes = [
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'posts', component: PostsContainerComponent, canActivate: [AuthGuard] }
];
