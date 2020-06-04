import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookService } from '../../services/book.service';

import { Router } from '@angular/router';

import { User } from '../../models/user.model';
//import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth-service.service';
import { Book } from 'src/app/models/book.model';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})

export class AddBookComponent implements OnInit {
  
  book: Book;
  user: User;
 
  constructor(private bookService: BookService, private router: Router, 
              private authService: AuthService,private flashMessage: FlashMessagesService) {//this.initialize()
              }

initialize(){
  this.book={
    title: '',
    price:0,
    genre: '',
    author: '',
    image:'',
    about:'',
    username:''
  
  }
  
}
initialize1(f){
  this.book={
    title: f.value.title,
    price:f.value.price,
    genre: f.value.genre,
    author: f.value.author,
    image:f.value.image,
    about:f.value.about,
    username:this.user.firstName,
    idUser:this.user.idUser
  }
  
}

  ngOnInit() {
    this.user=this.authService.User;
  }
 
  onSubmit(f) {
 
    this.initialize1(f);
    this.bookService.addBook(this.book).subscribe(data=>{
      this.flashMessage.show('New book is added!', { cssClass: 'alert-success', timeout: 3000 });
    });
    
    //this.bookService.updateBookidUser(this.user.idUser).subscribe();
     


   f.resetForm();
    this.router.navigate(['/profile']);  
  }

  onClear(f) {
      this.book = null;
      f.resetForm();
  }
}