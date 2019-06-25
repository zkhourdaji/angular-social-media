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
import { AlreadyLiked } from './pipes/already-liked.pipe';
import { AuthGuard } from './services/auth-guard/auth.guard';
import { PostsService } from './services/posts.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyMaterialModule } from './my-material-module/my-material.module';
import { PostsContainerComponent } from './posts-container/posts-container.component';
import { CommentsComponent } from './comments/comments.component';
import { NewPostComponent } from './new-post/new-post.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostComponent } from './post/post.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MyInterceptor } from './interceptor/my.interceptor';

@NgModule({
  imports: [
    BrowserModule,
    MyMaterialModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    PostsContainerComponent,
    NavbarComponent,
    SignInComponent,
    SignUpComponent,
    AlreadyLiked,
    CommentsComponent,
    NewPostComponent,
    PostsListComponent,
    PostComponent
  ],
  providers: [
    AuthService,
    AuthGuard,
    PostsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
