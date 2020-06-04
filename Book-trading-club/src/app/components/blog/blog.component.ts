import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { AuthService } from '../../services/auth.service';
//import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html'
})

export class BlogComponent implements OnInit {
  posts: Post [] = [];

  constructor(private postService:PostService,private authService:AuthService,private router:Router) { }

  ngOnInit() {
    this.postService.getPosts()
      .subscribe((posts:any) => {
          this.posts = posts.obj;
        }
      );
  }

  onPost() {
    this.router.navigate(['/publish']);
  }

  onRegister() {
    this.router.navigate(['/register']);
  }

  postDetails(post: Post) {
    this.router.navigate(['/post-details/', post.idPost]);
  }

  isLoggedIn () {
    return this.authService.isLoggedIn();
  }
}