import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../Task';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiURL = 'http://localhost:5000/tasks';

  constructor(private http: HttpClient) {}

  getOneTask(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiURL}/${id}`);
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiURL);
  }

  deleteTask(task: Task): Observable<Task> {
    const url = `${this.apiURL}/${task.id}`;
    // console.log(url);

    return this.http.delete<Task>(url);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiURL, task);
    
  }

  updateTask(task: Task): Observable<Task> {
    const url = `${this.apiURL}/${task.id}`;
    return this.http.put<Task>(url, task, httpOptions);
  }
}
