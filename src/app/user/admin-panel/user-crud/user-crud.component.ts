import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { UserService } from '../../user.service';
import { User } from '../../user.model';


@Component({
  selector: 'app-user-crud',
  templateUrl: './user-crud.component.html',
  styleUrls: ['./user-crud.component.css']
})
export class UserCrudComponent implements OnInit {

  public signupForm: FormGroup;
  isUpdate: boolean = false;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private matDialogRef: MatDialogRef<UserCrudComponent>) { }

  ngOnInit() {

    if (this.data) {
      this.isUpdate = true;
      
      this.signupForm = this.fb.group({
        username: [this.data.username,Validators.required],
        password: [this.data.password,Validators.required],
        email: [this.data.email,[Validators.required,Validators.email]],
        name: [this.data.name,Validators.required],
        age: [this.data.age,Validators.required],
        gender: [this.data.gender],
        role: [this.data.role],
        id: [this.data.id]
      });
    } else {
      this.signupForm = this.fb.group({
        username: [null,Validators.required],
        password: [null,Validators.required],
        email: [null,[Validators.required,Validators.email]],
        name: [null,Validators.required],
        age: [null,Validators.required],
        gender: [null],
        role: [null]
      });
    }

  }

  onSubmit(){
    if (!this.isUpdate) {
      this.userService.onSignUp(this.signupForm.value).subscribe(data => {
        this.matDialogRef.close(true);
        
      });
    } else {
      this.userService.onUpdateUser(this.signupForm.value).subscribe(data => {
        this.matDialogRef.close(true);
       
      });
    }
    }

}
