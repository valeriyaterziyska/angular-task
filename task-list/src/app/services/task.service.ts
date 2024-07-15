import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  getSortedData(sortOrder: string): Observable<Task[]> {
    console.log('task service sort');
    
    return this.getTasks().pipe(
      map(tasks => tasks.sort((a, b) => {
        if(sortOrder === 'asc') {
          console.log('asc', tasks);
          
          return a.title.localeCompare(b.title);
        }
        console.log('desc', tasks);

        return b.title.localeCompare(a.title);
       
      }))
    )
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
