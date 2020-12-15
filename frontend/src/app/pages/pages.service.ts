import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Response} from "../shared/interfaces/Response";
import {Todo} from "../shared/interfaces/Todo";

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  constructor(private http: HttpClient) {
  }

  getAllTodos() {
    return this.http.get<Response<Array<Todo>>>(environment.apiUrl + 'todos');
  }

  createTodo(body) {
    return this.http.post<Response<any>>(environment.apiUrl + 'todos', body)
  }

  updateTodo(body: Todo) {
    return this.http.put<Response<any>>(environment.apiUrl + `/todos/${body.id}`, body)
  }

  getTodoDetails(id) {
    return this.http.get<Response<Todo>>(environment.apiUrl + `todos/${id}`)
  }

  updateStatus(id: number, body) {
    return this.http.patch<Response<any>>(environment.apiUrl + `todos/${id}`, body);
  }

  deleteTodo(id: number) {
    return this.http.delete<Response<any>>(environment.apiUrl + `todos/${id}`)
  }
}
