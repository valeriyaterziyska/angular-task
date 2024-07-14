import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../../Task';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();

  title: string;
  completed: boolean = false;
  showAddTask?: boolean;
  subscription: Subscription;

  constructor(private uiService: UiService) {
    this.title = '';
    this.completed = false;
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  }

  ngOnInit(): void {}

  onSubmit() {
    if (!this.title) {
      alert('Please add task');
      return;
    }

    const newTask = {
      title: this.title,
      completed: this.completed,
    };

    this.onAddTask.emit(newTask);

    this.title = '';
    this.completed = false;
  }
}
