import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthService } from 'src/app/services/auth-service.service';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
    selector: 'app-publish',
    templateUrl: './publish.component.html'
})

export class PublishComponent implements OnInit {
    form : NgForm;
    post: Post;
    user: User;

    constructor(private postService: PostService, private authService: AuthService, private router: Router) {this.initializePost();}

    initializePost() {
        this.post={
            title:'',
            content:'',
            username:'',
            idUser:0
        };
    }

    initializePost1(f) {
        this.post={
        
            title:f.value.title,
            content:f.value.content,
            username:this.user.firstName,
            idUser:this.user.idUser
        };
    }


    ngOnInit() {
        if (!this.authService.isLoggedIn())
            this.router.navigate(['/login']);
        this.user=this.authService.User;
    }




    onSubmit(f) {
        this.initializePost1(f);
        
        this.postService.addPost(this.post)
            .subscribe(data => console.log(data), error => console.error(error));
        f.resetForm();
        this.router.navigate(['/blog']);
    }

    onClear(f) {
        this.post = null;
        f.resetForm();
    }
} 
