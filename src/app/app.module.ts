import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from './services/auth.service';

import { appRoutes } from './routes';
import { SignInComponent } from './auth/signin.component';
import { SignUpComponent } from './auth/signup.component';
import { PostsComponent } from './posts/posts.component';
import { AlreadyLiked } from './pipes/already-liked.pipe';
import { AuthGuard } from './services/auth.guard';
import { PostsService } from './services/posts.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyMaterialModule } from './my-material-module/my-material.module';
import { PostsContainerComponent } from './posts/posts-container.component';
import { CommentsComponent } from './posts/comments.component';
import { NewPostComponent } from './posts/new-post.component';
import { PostsListComponent } from './posts/posts-list.component';
import { PostComponent } from './posts/post.component';

@NgModule({
  imports: [
    BrowserModule,
    MyMaterialModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    AppComponent,
    PostsContainerComponent,
    NavbarComponent,
    SignInComponent,
    SignUpComponent,
    PostsComponent,
    AlreadyLiked,
    CommentsComponent,
    NewPostComponent,
    PostsListComponent,
    PostComponent
  ],
  providers: [AuthService, AuthGuard, PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
