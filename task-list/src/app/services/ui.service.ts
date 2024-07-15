import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { TaskService } from './task.service';
import { Task } from '../Task';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showAddTask: boolean = false;
  private subject = new Subject<any>();
   
  constructor(private taskService: TaskService) { }

  toggleAddTask(): void {
    this.showAddTask = !this.showAddTask;
    this.subject.next(this.showAddTask);
  }

  sortTasks(): void {
    // console.log("ui service sort");
    
    // this.taskService.getTasks().subscribe((tasks) => {
      
    //   tasks = tasks.sort((a, b) => (a.title.localeCompare(b.title)));
    //   console.log('sorted', tasks);
      
    // });
  }

  // getTasks(): Observable<Task[]> {
  //   return this.http.get<Task[]>(this.apiURL);
  // }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}
