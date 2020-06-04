import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { User } from '../../models/user.model';
//import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth-service.service';
import { ErrorService } from 'src/app/services/error.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  form: FormGroup;
  user: User;
  constructor(private authService: AuthService, private router: Router, private errorService:ErrorService,private flashMessage: FlashMessagesService) { }
  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]),
      password: new FormControl(null, Validators.required)
    });
  }

  initializeStock() {
     this.user = {
     
       email: this.form.value.email,
       password: this.form.value.password,
     };
  }


  onSubmit() {
    this.initializeStock();
    this.authService.login(this.user)
      .subscribe(
        data => {
          if (data.log) {
            this.flashMessage.show('Logged in!', { cssClass: 'alert-success', timeout: 3000 });
              this.router.navigate(['home']);
          }
          else {
            this.flashMessage.show('Email or password not correct', { cssClass: 'alert-danger', timeout: 3000 });
          }
        },
        error => {
           this.flashMessage.show('Invalid email or/and password!', { cssClass: 'alert-danger', timeout: 3000 });
        
          this.errorService.handleError(error.error);
        }
      );
    this.form.reset();
  }

  register() {
       this.router.navigate(['/register']);
   }
}