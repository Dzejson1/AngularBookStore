import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service.service';
import { User } from 'src/app/models/user.model';
//import { AuthService } from '../../services/auth.service';
//import { Book } from '../../models/book.model';
//import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent implements OnInit {
  //
 constructor(private authService: AuthService) {}
  
  user: User;
  

  ngOnInit() {
    
  }

   isLoggedIn() {
     return this.authService.isLoggedIn();
   }

  isAdmin() {
    if(this.authService.User!=null  && this.authService.User.role==1){
      return true;
    }
    return false;
  
  }
}
