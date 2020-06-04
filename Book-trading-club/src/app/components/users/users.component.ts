import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})

export class UsersComponent implements OnInit {
  public users: User[] = [];
 
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit () {
      this.authService.getUsers()
        .subscribe((users: any) => {
            this.users = users.obj;
          }
        );
  }

  isAdmin (user: User) {
    return user.role==1;
  }
}