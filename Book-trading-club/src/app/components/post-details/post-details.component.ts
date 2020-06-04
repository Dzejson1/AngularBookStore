import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';
import { User } from '../../models/user.model';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
})

export class PostDetailsComponent implements OnInit{
    post: Post;
    user: User;

    constructor(private postService: PostService, private route: ActivatedRoute,
                private authService: AuthService, private flashMessage: FlashMessagesService,
                private router: Router) {}
        
    ngOnInit () {
        this.postService.getPost(this.route.snapshot.params['id'])
            .subscribe((post: any) => {
                    this.post = post.obj;
                }
            );
            
      this.user=this.authService.User;
    }
        
    isAdmin() {
        return this.user.role==1;
    }

    onDelete() {
        this.postService.deletePost(this.post.idPost)
            .subscribe(
                result => {
                    console.log(result);
                    this.router.navigate(['/blog']);
                    this.flashMessage.show('Post is deleted!', { cssClass: 'alert-danger', timeout: 3000 });
                },
                error => console.error(error));
    }

    
}