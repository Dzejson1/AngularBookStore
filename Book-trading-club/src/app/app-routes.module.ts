import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { BlogComponent } from './components/blog/blog.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { PublishComponent } from './components/publish/publish.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { UpdateBookComponent } from './components/update-book/update-book.component';
import { ChangeProfilePictureComponent } from './components/change-profile-picture/change-profile-picture.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { UsersComponent } from './components/users/users.component';
import { ShowInfoComponent } from './components/show-info/show-info.component';



  // { path: 'show-info/:id',component:ShowInfoComponent}, 
const APP_ROUTES: Routes = [
  { path: '', pathMatch: 'full',component: HomeComponent },
  { path: 'home', pathMatch: 'full',component: HomeComponent },
  { path: 'register',component: RegisterComponent },
  { path: 'blog',component: BlogComponent }, 
  { path: 'about',component: AboutComponent },
  { path: 'login',component: LoginComponent },
  { path: 'logout',component: LogoutComponent },
  { path: 'logout',component: LogoutComponent },
  { path: 'book-details/:id',component: BookDetailsComponent },
  { path: 'add-comment/:id',component:AddCommentComponent}, 
  { path: 'publish',component:PublishComponent}, 
  { path: 'profile',component:ProfileComponent}, 
  { path: 'post-details/:id',component:PostDetailsComponent}, 
  { path: 'add-book',component:AddBookComponent}, 
  { path: 'update-book/:id',component:UpdateBookComponent}, 
  { path: 'change-profile-picture',component:ChangeProfilePictureComponent}, 
  { path: 'allUsers',component:UsersComponent}, 
  { path: 'show-info/:id',component:ShowInfoComponent}, 
  
  { path: '**', component:PageNotFoundComponent , data: { title: 'Invalid path'}} 
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(APP_ROUTES)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutesModule { }
