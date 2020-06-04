import { Component, OnInit, ViewChild } from '@angular/core';;
import { Router } from '@angular/router';

import { User } from '../../models/user.model';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-change-profile-picture',
  templateUrl: './change-profile-picture.component.html',
  styleUrls: ['./change-profile-picture.component.css']
})

export class ChangeProfilePictureComponent implements OnInit {
    user: User;

    constructor(private router: Router, private authService: AuthService, private flashMessage: FlashMessagesService
                ) {}

    ngOnInit () {
      this.user=this.authService.User;
    }

    onSubmit (f) {
        this.user.image = f.value.image;
        this.authService.changeProfilePicture(f.value.image,this.user.idUser)
                .subscribe((user: User) => {
                        this.user = user;
                        this.router.navigate(['/profile']);
                        this.flashMessage.show('Profile picture changed', { cssClass: 'alert-warning', timeout: 3000 });
                    }
                );
    }
}