import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommentService } from '../../services/comment.service';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../models/user.model';
import { Comment } from '../../models/comment.model';

import { AuthService } from 'src/app/services/auth-service.service';
import { DatePipe } from '@angular/common';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})

export class AddCommentComponent implements OnInit {
    
  user: User;
  book: any = {}
  comment: Comment;
  date:Date;
  latest_date:string;
  
  constructor(private commentService: CommentService, private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,public datepipe: DatePipe,private flashMessage: FlashMessagesService) { this.initializeComment(); }

  initializeComment() {
    this.comment = {
      idComment: 0,
      content: '',
      username: '',
      grade: 0,
      tag: '',
      publishDate: null,
      idBook: 0,
      idUser: 0
    };
  }

  initializeComment1(f) {

    this.comment = {
      idComment: 0,
      content: f.value.content,
      username: this.user.firstName,
      grade: f.value.grade,
      tag: f.value.tag,
      publishDate: new Date(this.latest_date),
      idBook: this.route.snapshot.params['id'],
      idUser: this.user.idUser
    };
  }


  ngOnInit() {

    
    if (!this.authService.isLoggedIn())
      return this.router.navigate(['/login']);

    this.user = this.authService.User;

  }
  
  createComment(f) {
    this.date=new Date();
    this.latest_date =this.datepipe.transform(this.date, 'yyyy-MM-dd hh:mm:ss');
    this.initializeComment1(f);
    this.commentService.addComment(this.comment)
      .subscribe(
        (data) => {
           this.flashMessage.show('New comment is added!', { cssClass: 'alert-success', timeout: 3000 });
        },
        error => {
        }
      );

    f.resetForm();
    this.router.navigate(['/book-details/', this.route.snapshot.params['id']]);
  }

  onClear(f) {
    this.comment = null;
    f.resetForm();
  }
}
