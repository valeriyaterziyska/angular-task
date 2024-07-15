import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { UiService } from '../../services/ui.service';
import { Observable, Subscription, of } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { Task } from 'src/app/Task';
import { TasksComponent } from '../tasks/tasks.component';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent{
  @Input() task: Task;
  @Input() tasks: Task[];

  title: string = 'Task List';
  showAddTask: boolean = false;
  subscription: Subscription;
  sortedData: Task[];

  constructor(
    private uiService: UiService,
    private taskService: TaskService,
    private router: Router
  ) {
    this.task = { title: '', completed: '' };
    this.tasks = [];
    this.sortedData = [];
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  }

  addTask() {
    this.uiService.toggleAddTask();
  }
  sortTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      tasks.sort((a, b) => a.title.localeCompare(b.title));

      console.log('view sorted', tasks);
    });
  }
}
