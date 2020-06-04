import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { Comment } from '../../models/comment.model';
import { BookService } from '../../services/book.service';

import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
//import { CommentService } from '../../services/comment.service';
import { User } from '../../models/user.model';
import { AuthService } from 'src/app/services/auth-service.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
    book:Book;
    user:User;
    comments: Comment[] = [];

    constructor(private bookService: BookService, private authService: AuthService,
                private router: Router, 
                private route: ActivatedRoute,private commentService: CommentService,private flashMessage: FlashMessagesService) {}

    ngOnInit () {
        this.bookService.getBook(this.route.snapshot.params['id'])
             .subscribe(
               (book: any) => {
                   this.book = book.obj;
                   
                }
             );

          this.commentService.getComments(this.route.snapshot.params['id'])
              .subscribe((comments: any) => {
                  this.comments= comments.obj;
              }
         );

        this.user=this.authService.User;
    }

     onBuy () {
        this.book.idUserBuyer = this.user.idUser;

        this.bookService.updateBookSold(this.book.idBook,this.user.idUser)
            .subscribe(result => console.log(result), error => console.error(error));
        
         this.router.navigate(['/']);
         this.flashMessage.show('Book is bought!', { cssClass: 'alert-success', timeout: 3000 });
     }

    belongsToUser () {
        if(this.authService.isLoggedIn())
            return this.authService.User.idUser == this.book.idUser;
        return true;
    }

    isAdmin () {
        return this.user.role==1;
    }

    // onDelete () {
    //     this.bookService.deleteBookAdmin(this.book)
    //         .subscribe(
    //             result => {
    //                 console.log(result)
    //                 this.flashMessage.show('Book is deleted!', { cssClass: 'alert-danger', timeout: 3000 });
    //                 this.router.navigate(['/']);
    //             },
    //             error => console.error(error)); 
    // }

     onComment () {
         this.router.navigate(['/add-comment/', this.book.idBook]);
     }

    // onUpdate () {
    //     this.router.navigate(['/update-book', this.book.bookId]);
    // }
 
    isDefined () {
         return this.book.about !== null;
     }
}
