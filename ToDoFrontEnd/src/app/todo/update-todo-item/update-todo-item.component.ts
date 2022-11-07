import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../service/todo.service';
import { ToDoItem } from '../../model/ToDoItem';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-todo-item',
  templateUrl: './update-todo-item.component.html',
  styleUrls: ['./update-todo-item.component.scss']
})
export class UpdateTodoItemComponent implements OnInit {

  get todoItem(): ToDoItem{
    return this.todoService.currentUpdatingTodoItem();
  }

  constructor(public todoService: TodoService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void { 
    const id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  update(): void {
    this.todoService.update(this.todoItem);
  }
}
