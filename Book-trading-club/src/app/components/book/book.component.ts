import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})

export class BookComponent implements OnInit{
    @Input() book: Book;

    constructor(private bookService: BookService, private router: Router, private authService: AuthService,private flashMessage: FlashMessagesService) {}
    
    ngOnInit(){}

    onUpdate(book : Book) {
        this.router.navigate(['/update-book/', book.idBook]);
    }

    onDelete() {
        this.bookService.deleteBook(this.book.idBook).subscribe(
                result => {
                    this.flashMessage.show('Book is deleted!', { cssClass: 'alert-danger', timeout: 3000 });
                    this.router.navigate(['/profile']); 
                },
                error => {
                    console.error(error)
                });     
    }

    belongsToUser() {
        
        return this.authService.User.idUser === this.book.idUser;
        
    }

    isBookSolded() {
        return this.book.solded;
    }

    bookDetails() {

        this.router.navigate(['/book-details/', this.book.idBook]);
    }

    showInfo() {
        this.router.navigate(['/show-info/', this.book.idUserBuyer]);
    }
}