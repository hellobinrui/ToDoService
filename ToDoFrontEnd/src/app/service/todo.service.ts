import { TodoApiService } from './../api/todo.api.service';
import { Injectable } from '@angular/core';
import { ToDoItem } from '../model/ToDoItem';
import { TodoStoreService } from './todo-store.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  public errorMessage?: string;
  private _selectedTodoItem: ToDoItem = {} as ToDoItem;
  private _updatingTodoItem: ToDoItem = {} as ToDoItem;
  constructor(private todoStore: TodoStoreService,
              private todoApi: TodoApiService) {
  }

  public get todoItems(): Array<ToDoItem> {
    return this.todoStore.getAll();
  }

  public create(todoItem: ToDoItem): void {
    this.todoApi.create(todoItem).subscribe({
      next: response => {},
      error: err => this.errorMessage = err.errorMessage,
    });
  }

  public get(id: number): void {
    this.todoApi.findById(id).subscribe({
      next: response => {of({response}) },
      error: err => this.errorMessage = err.errorMessage,
    });
  }

  public update(updateTodoItem: ToDoItem): void {
    this.todoStore.update(updateTodoItem);
  }

  public delete(id: number): void {
    // this.todoStore.delete(id);
    this.todoApi.delete(id).subscribe({
      next: response => {of({}) },
      error: err => this.errorMessage = err.errorMessage,
    });
  }

  public selectTodoItem(id: number): void {
    this._selectedTodoItem = this.todoStore.findById(id);
  }

  public selectTodoItemForUpdate(id: number): void {
    this._updatingTodoItem = Object.assign({}, this.todoStore.findById(id));
  }

  public currentTodoItem(): ToDoItem {
    return this._selectedTodoItem;
  }

  public currentUpdatingTodoItem(): ToDoItem {
    return this._updatingTodoItem;
  }
  public findById(id: number): ToDoItem {
    return this.todoStore.findById(id);
  }
}
