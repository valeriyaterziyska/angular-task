import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../Task';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent {
  @Input() task: Task;
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onchangeStatusTask: EventEmitter<Task> = new EventEmitter();

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.task = { title: '', completed: '' };
  }

  editTaskStatus(task: Task) {
    this.onchangeStatusTask.emit(task);
  }

  deleteTask(task: Task) {
    this.onDeleteTask.emit(task);
  }

  detailsTask(task: Task) {
    this.router.navigateByUrl(`/${task.id}`);
  }
}
