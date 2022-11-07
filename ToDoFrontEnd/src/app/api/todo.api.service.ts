import { ToDoItem } from './../model/ToDoItem';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {

  constructor(private http: HttpClient) { }

  create(todoItem: ToDoItem): Observable<void> {
    return this.http.post<void>('https://635fc244ca0fe3c21aa3d012.mockapi.io/api/todos',
      todoItem);
  }
}
