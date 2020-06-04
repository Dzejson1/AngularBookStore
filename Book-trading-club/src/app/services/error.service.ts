import { EventEmitter, Injectable } from '@angular/core';
import { Error } from '../models/error.model';

@Injectable()
export class ErrorService {
    errorOccurred = new EventEmitter<Error>();
    error:Error;

    handleError(error:Error) {
        
        //const errorData = new Error(error.title, error.msg);
        this.error=error;

        this.errorOccurred.emit(this.error);
    }
}
