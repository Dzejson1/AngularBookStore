import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  public User:User;

  public authToken: string = null;
  
  set token(token: string) {
    this.authToken = token;
  }

  get token() {
    return this.authToken;
  }

  isLoggedIn() {
    return this.token != null;
  }
  getUsers() : Observable<any> {

    return this.http.get<any>('/users');

  }
  getUser(idUser:number) : Observable<any> {

    return this.http.get<any>('/users/findBy'+idUser);

  }
  

  changeProfilePicture(image:string,idUser: number): Observable<any> { 
    return this.http.patch<any>('/users/updateImage'+idUser, {image:image});
  }

  register(user:User) : Observable<any> {

    return this.http.post('/users/addUser',user)

  }

  login(user:User) : Observable<any> {

    return this.http.post('/users/login',user)
    .pipe(map((resp: any) => {
      this.authToken = resp.token;
      this.User=resp.obj;
      return resp;
      }));

  }




        
}
