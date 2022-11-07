import { Location } from '@angular/common';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, Routes } from '@angular/router';
import { CreateTodoitemComponent } from './todo/create-todoitem/create-todoitem.component';
import { ListTodoitemComponent } from './todo/list-todoitem/list-todoitem.component';
import { TodoitemDetailComponent } from './todo/todoitem-detail/todoitem-detail.component';
import { UpdateTodoItemComponent } from './todo/update-todo-item/update-todo-item.component';
describe('Router', () => {
  let location: Location;
  let router: Router;
  const routes: Routes = [
    {
      path: '',
      redirectTo: '/todos',
      pathMatch: 'full'
    },
    {
      path: 'todos',
      component: ListTodoitemComponent
    },
    {
      path: 'todos/create',
      component: CreateTodoitemComponent
    },
    {
      path: 'todos/edit/:id',
      component: UpdateTodoItemComponent
    },
    {
      path: 'todos/:id',
      component: TodoitemDetailComponent
    },
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: []
    });

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    router.initialNavigation();
  });

  it('should navigate to todos when empty string url', fakeAsync(() =>{
    // given, fakeasync营造一个异步环境
    // when
    router.navigate(['']);
    tick(50);
    // then
    expect(location.path()).toEqual('/todos');
  }));

  it('should navigate to create when url is todos/create ', fakeAsync(() => {
    // given
    // when
    router.navigate(['todos', 'create']);
    tick(50);
    // then
    expect(location.path()).toEqual('/todos/create');
  }));

  it('should navigate to update when url is todos/edit/:id ', fakeAsync(() => {
    // given
    // when
    router.navigate(['todos', 'edit', 1]);
    tick(50);
    // then
    expect(location.path()).toEqual('/todos/edit/1');
  }));

  it('should navigate to detail when url is todos/:id ', fakeAsync(() => {
    // given
    // when
    router.navigate(['todos', 1]);
    tick(50);
    // then
    expect(location.path()).toEqual('/todos/1');
  }));
});
