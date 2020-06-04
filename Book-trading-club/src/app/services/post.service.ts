import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts() : Observable<Post[]> {
    return this.http.get<Post[]>('/posts');
  }
  deletePost(idPost:number):Observable<any>{
    return this.http.delete<any>('/posts/deletePost'+idPost)
  }

  getPost(idPost:number) : Observable<any> {
    return this.http.get<any>('/posts/findBy'+idPost);
  }

 

  addPost(post:Post) :Observable<any>{
    console.log(post);
    return this.http.post('/posts/addPost',post);
  }
        
}

