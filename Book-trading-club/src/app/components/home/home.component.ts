import { Component, OnInit } from '@angular/core';
//import { BookService } from '../../services/book.service';

import { Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
  public books: Book[] = [];

  constructor(private bookService:BookService,private router: Router) {}

  ngOnInit () {
    this.bookService.getBooksHome()
       .subscribe((books: Book[]) => {
          this.books = books;
          }
       );
  }

     bookDetails(book: Book) {
       this.router.navigate(['/book-details/', book.idBook]);
     }
}
