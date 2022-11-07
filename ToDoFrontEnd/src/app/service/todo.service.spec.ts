import { HttpClient } from '@angular/common/http';
import { TodoApiService } from './../api/todo.api.service';
import { ToDoItem } from './../model/ToDoItem';
import { TestBed } from '@angular/core/testing';
import { TodoStoreService } from './todo-store.service';
import { TodoService } from './todo.service';
import { of, throwError } from 'rxjs';
import { assertPlatform } from '@angular/core';

describe('TodoService', () => {

  let service: TodoService;
  let todoStoreService: TodoStoreService;
  let httpclient: any;
  beforeEach(() => {
    httpclient = jasmine.createSpyObj('HttpClient', ['post', 'get', 'delete']);
    todoStoreService = new TodoStoreService();
    TestBed.configureTestingModule({
      providers: [
        TodoApiService,
        { provide: HttpClient, useValue: httpclient }
      ]
    });
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create todoItem via mockHttp post', () => {
    // given
    const todoItem = new ToDoItem(9, 'title', 'description', true);
    httpclient.post.and.returnValue(of({}));
    // when
    service.create(todoItem);
    // then
    expect(httpclient.post).toHaveBeenCalledWith('https://localhost:5001/ToDos', todoItem);
  });

  it('should response error when create fails', () => {
    // given
    const todoItem = new ToDoItem(9, 'title', 'description', true);
    httpclient.post.and.returnValue(
      throwError(() => ({ errorMessage: 'create fails!' })
      ));
    // when
    service.create(todoItem);
    // then
    expect(service.errorMessage).toEqual('create fails!');
  });

  it('should get todoItem via mockHttp get', () => {
    // given
    const todoItem = new ToDoItem(1, '1', '2', false);
    httpclient.get.and.returnValue(of({}));
    // when
    service.get(todoItem.id);
    // then
    expect(httpclient.get).toHaveBeenCalledWith(`https://localhost:5001/ToDos/${todoItem.id}`);
  });

  it('should delete todoItem via mockHttp delete', () => {
    // given
    const todoItem = new ToDoItem(1, '1', '2', false);
    httpclient.delete.and.returnValue(of({}));
    // when
    service.delete(todoItem.id);
    // then
    expect(httpclient.delete).toHaveBeenCalledWith(`https://localhost:5001/ToDos/${todoItem.id}`);
  });

});
