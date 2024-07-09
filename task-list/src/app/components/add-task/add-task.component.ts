import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../../Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();

  title: string;
  completed: boolean = false;

  constructor() {
    this.title = '';
    this.completed = false;
  }

  ngOnInit(): void {}

  onSubmit() {
    if(!this.title) {
      alert('Please add task');
      return;
    }

    const newTask = {
      title: this.title,
      completed: this.completed,
    }

    this.onAddTask.emit(newTask);

    this.title = '';
    this.completed = false;
  }
}
