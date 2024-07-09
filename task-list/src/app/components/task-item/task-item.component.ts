import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../Task';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent {
  @Input() task: Task;
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();

  constructor() {
    this.task = { title: '', completed: false };
  }

  editTask() {}

  deleteTask(task: Task) {
    this.onDeleteTask.emit(task);
    
  }
}
