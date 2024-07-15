import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
})
export class EditTaskComponent implements OnInit {
  public id: string = this.route.snapshot.paramMap.get('id') || '';
  public title: string = '';
  public completed: string = '';
  public task$: Observable<Task> = this.taskService.getOneTask(this.id);

  taskEditForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    completed: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.task$.subscribe((task) => {
      let { title, completed } = task;
      // console.log('on init task');
      this.taskEditForm.patchValue({ title, completed });
    });
  }

  getTask() {
    console.log(this.taskService.getOneTask(this.id));
  }

  submitForm(): void {
    console.log('submit form');

    // const newTask = {...this.taskEditForm.value, id: this.id};
    this.title = this.taskEditForm.value.title as string;
    this.completed = this.taskEditForm.value.completed as string;

    if (this.completed) {
      this.completed = 'true';
    } else {
      this.completed = 'false';
    }

    const newTask = {
      id: this.id,
      title: this.title,
      completed: this.completed,
    };

    console.log('new values', newTask);

    this.taskService.updateTask(newTask).subscribe((task) => {
      console.log('updated task:', task);
      alert("Saved changes!");
      this.router.navigate([`/${this.id}`]);
    });
  }
}
