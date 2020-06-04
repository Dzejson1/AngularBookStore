import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { AuthService } from 'src/app/services/auth-service.service';
import { FlashMessagesService } from 'angular2-flash-messages';
//import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  form: FormGroup;
  re: any;
  public user:User;

  constructor(private authService: AuthService,private router:Router,private flashMessage: FlashMessagesService){}
  

  initializeStock() {
    this.user =  {
     
      email: this.form.value.email,
      password:  this.form.value.password,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      country: this.form.value.country,
      city: this.form.value.city,
      postalCode:this.form.value.postalCode,
      adress:this.form.value.adress,
      phoneNumber:this.form.value.phoneNumber,
      image:"https://www.shareicon.net/data/2016/09/01/822711_user_512x512.png"
    };
  }


  ngOnInit() {
    this.re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.form = new FormGroup({
        firstName: new FormControl(null, [
          Validators.required,
          Validators.pattern("^(?=.{2,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$")
        ]),
        lastName: new FormControl(null, [
            Validators.required,
            Validators.pattern("^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$")
        ]),
        email: new FormControl(null, [
            Validators.required,
            Validators.pattern(this.re)
        ]),
        password: new FormControl(null, Validators.required),
        country: new FormControl(null, Validators.required),
        city: new FormControl(null, Validators.required),
        postalCode: new FormControl(null, Validators.required),
        adress: new FormControl(null, Validators.required),
        phoneNumber: new FormControl(null, Validators.required)
    });
}

onSubmit() {
    this.initializeStock();

   console.log(this.user)


     this.authService.register(this.user)
         .subscribe(data => {
                 this.flashMessage.show('Registered!', { cssClass: 'alert-success', timeout: 3000 });
                this.router.navigate(['/login']);
                 },
            error => console.error(error));

     this.form.reset();
  }

   login () {
       this.router.navigate(['/login']);
   }
}