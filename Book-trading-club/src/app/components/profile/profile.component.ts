import { Component, OnInit} from '@angular/core';
import { Book } from '../../models/book.model';

import { Router } from '@angular/router';

import { User } from '../../models/user.model';
import { AuthService } from 'src/app/services/auth-service.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
    books: Book[];
    user: User;

    constructor(private bookService: BookService, private router: Router, 
                private authService: AuthService) {}

    ngOnInit () {
        
            this.user=this.authService.User;

           // this.bookService.refreshNedded.subscribe(()=>{

    
                // this.bookService.getBookUser(this.user.idUser)
                // .subscribe((books:any) => {  
                //     this.books = books.obj;
                // }
            //);

           // });
            
            this.bookService.getBookUser(this.user.idUser)
                .subscribe((books:any) => {  
                    this.books = books.obj;
                }
            );

    }

    addBook () {
        this.router.navigate(['/add-book']);
    }


    changeProfilePicture () {
        this.router.navigate(['/change-profile-picture']);
    }
}