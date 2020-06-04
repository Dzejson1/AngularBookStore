import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutesModule } from './app-routes.module';
import { BookService } from './services/book.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth-service.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BlogComponent } from './components/blog/blog.component';
import { PostService } from './services/post.service';
import { PostComponent } from './components/post/post.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { BookAppInterceptor } from './services/book-app.interceptor';
import { LogoutComponent } from './components/logout/logout.component';

import { BookDetailsComponent } from './components/book-details/book-details.component';
import { CommentComponent } from './components/comment/comment.component';
import { ErrorComponent } from './components/error/error.component';
import { ErrorService } from './services/error.service';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { DatePipe } from '@angular/common';
import { PublishComponent } from './components/publish/publish.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BookComponent } from './components/book/book.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { UpdateBookComponent } from './components/update-book/update-book.component';
import { ChangeProfilePictureComponent } from './components/change-profile-picture/change-profile-picture.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { UsersComponent } from './components/users/users.component';
import { ShowInfoComponent } from './components/show-info/show-info.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    RegisterComponent,
    BlogComponent,
    PostComponent,
    AboutComponent,
    LoginComponent,
    LogoutComponent,
    BookDetailsComponent,
    CommentComponent,
    ErrorComponent,
    AddCommentComponent,
    PublishComponent,
    ProfileComponent,
    BookComponent,
    AddBookComponent,
    UpdateBookComponent,
    ChangeProfilePictureComponent,
    PageNotFoundComponent,
    PostDetailsComponent,
    UsersComponent,
    ShowInfoComponent,
   
   
    
  
  ],
  imports: [
   
    BrowserModule,
    AppRoutesModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FlashMessagesModule.forRoot()
    
  ],
  providers: [
    BookService,
    PostService,
    AuthService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:BookAppInterceptor,
      multi:true
    },
    ErrorService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
