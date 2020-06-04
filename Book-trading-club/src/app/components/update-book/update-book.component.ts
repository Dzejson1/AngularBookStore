import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { User } from '../../models/user.model';
import { Router, ActivatedRoute } from '@angular/router';

//import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth-service.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})

export class UpdateBookComponent implements OnInit {
  book: Book;
  user: User;
  userName: string;
  
//
  constructor(private bookService: BookService, private router: Router, 
    private authService: AuthService, private route: ActivatedRoute,private flashMessage: FlashMessagesService
    ) {}

  ngOnInit() {
    this.user=this.authService.User;
    this.bookService.getBook(this.route.snapshot.params['id'])
        .subscribe((book:any) => {
            
            this.book=book.obj;
            
        });
  }


  initialize1(f){
    this.book={
      idBook:this.route.snapshot.params['id'],
      title : f.value.title,
      author : f.value.author,
      price :f.value.price,
      genre :f.value.genre,
      about : f.value.about
    }

  }
  onSubmit(f) {
    
    this.initialize1(f);

      this.bookService.updateBook(this.book.idBook,this.book)
        .subscribe(data => console.log(data), error => console.error(error.error));
      
    this.flashMessage.show('Book is updated!', { cssClass: 'alert-warning', timeout: 3000 });
    this.router.navigate(['/']);
    
  // } else {
    
  //   //this.bookService.updateBook(this.book)
  //    // .subscribe(data => console.log(data), error => console.error(error));
  //       this.book = null;
    
  //   this.form.resetForm();
  //   //this.flashMessage.show('Book is updated!', { cssClass: 'alert-warning', timeout: 3000 });
  //   this.router.navigate(['/profile']);
  //   }
  }


}