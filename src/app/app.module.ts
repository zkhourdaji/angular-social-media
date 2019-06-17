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
    NavbarComponent,
    SignInComponent,
    SignUpComponent,
    PostsComponent,
    AlreadyLiked,
  ],
  providers: [AuthService, AuthGuard, PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
