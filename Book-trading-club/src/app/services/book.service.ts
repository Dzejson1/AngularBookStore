import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book.model';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  public refreshNedded=new Subject<void>();

  getBooksHome() : Observable<Book[]> {
   
    return this.http.get<Book[]>('/books')
  }

  getBookUser(idUser:number) : Observable<any> {
    return this.http.get<any>('/books/nadjiUsera'+idUser);
  }
 
  getBook(idBook:number) : Observable<any> {
    return this.http.get<any>('/books/findBy'+idBook);
   }


  updateBookSold(idBook: number,idUser: number): Observable<any> { 
    return this.http.patch<any>('/books/soldBook'+idBook, {idUser1:idUser});
  }

  addBook(book:Book) : Observable<any> {
    return this.http.post('/books/addBook',book);
  }

  deleteBook(idBook:number) : Observable<any> {

    return this.http.delete<any>('/books/deleteBook'+idBook);
    // .pipe(tap(()=>{
       
    //   this.refreshNedded.next();
      
    // }
    // ));
  }

  updateBook(idBook:number,book:Book): Observable<any> { 
    return this.http.patch<any>('/books/updateBook'+idBook,
     {
       book:book
      
      });
  }

}


