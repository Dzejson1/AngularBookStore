import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { Comment } from '../../../models/comment.model';
import { Comment } from '../models/comment.model';
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getComments(idBook:number) : Observable<Comment[]> {
    console.log("uso")
    return this.http.get<Comment[]>('/comments/findBy'+idBook);
  }
  
  addComment(comment:Comment):Observable<any>{
    
    return this.http.post<any>('/comments/addComment',comment);

  }

        
}

