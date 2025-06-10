import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '../../services/task.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { refreshTask } from '../../services/Refresh.service';


@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule,MatDatepickerModule,ReactiveFormsModule, MatInputModule, MatNativeDateModule],
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  

  private svForm = inject(FormBuilder);
  private svTask = inject(TaskService);
  private editValue = inject(DIALOG_DATA).values;
  public svmodal = inject(MatDialogRef<NewTaskComponent>)


  public TaskForm = this.svForm.group({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),

  });
  tasksSubject: any;


  ngOnInit(): void {
    if (this.editValue) {
      this.getTaskToEdit();
    }
  }

  private getTaskToEdit() {
    this.TaskForm.setValue({
      title: this.editValue.title,
      description: this.editValue.description
    })
  }

  onSubmit() {

    if (this.TaskForm.valid) {
     
     
      let task = {
        ...this.editValue,
        title: this.TaskForm.value.title ?? "",
        description: this.TaskForm.value.description ?? ""
      }
     
      if (this.editValue) {
      
        this.svTask.taskUpdate(task).subscribe(data => {
          this.svmodal.close(data);
        });
       

      } else {
        task = {
          ...task,
          status: 0,
        }
        this.svTask.taskCreate(task).subscribe(data => {
          this.svmodal.close(data);
          if(data) {
            refreshTask.next();
          }
        })
        
      }
     
     
    }
   
  }

  onCancel() {
    this.TaskForm.reset();
    this.svmodal.close();
   
  }


}
