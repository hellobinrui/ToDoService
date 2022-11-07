import { ToDoItem } from './../model/ToDoItem';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BaseUrl = 'https://localhost:5001/ToDos';

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {

  constructor(private http: HttpClient) { }

  create(todoItem: ToDoItem): Observable<ToDoItem> {
    return this.http.post<ToDoItem>('https://localhost:5001/ToDos', todoItem);
  }
  findById(id: number): Observable<ToDoItem> {
    return this.http.get<ToDoItem>(`${BaseUrl}/${id}`);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${BaseUrl}/${id}`);
  }


}
