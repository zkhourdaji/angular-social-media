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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignInComponent,
    SignUpComponent,
    PostsComponent,
    AlreadyLiked,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AuthService, AuthGuard, PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
