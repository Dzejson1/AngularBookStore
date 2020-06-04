import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-show-info',
  templateUrl: './show-info.component.html'
})

export class ShowInfoComponent implements OnInit {
  public user: any = {};
 
  constructor(private authService: AuthService, private route: ActivatedRoute) {}

  ngOnInit () {
    if(this.authService.isLoggedIn()) {
    this.authService.getUser(this.route.snapshot.params['id'])
      .subscribe((user: any) => {
          this.user = user.obj;
        }
      );
    }
  }
}