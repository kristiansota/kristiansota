import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  
  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  public signupForm: FormGroup;

  users: User[] = [];

  ngOnInit() {
    this.signupForm = this.fb.group({
      username: [null,Validators.required],
      password: [null,Validators.required],
      email: [null,[Validators.required,Validators.email]],
      name: [null,Validators.required],
      age: [null,Validators.required],
      gender: [null]
    });

    this.userService.getUsers().subscribe(data => {
      this.users = data
      console.log(this.users);
    } );


  }

  onSubmit(){

      if (this.users.filter(u => u.username === this.signupForm.value.username).length){

        this.snackBar.open('This Username has already been taken!', 'OK', {
          duration: 2500,
          verticalPosition: 'top'
         });
      }
      
      else if (this.users.filter(u => u.email === this.signupForm.value.email).length){

        this.snackBar.open('This e-mail adress has already been used!', 'OK', {
          duration: 2500,
          verticalPosition: 'top'
         });
      }

      else if (this.signupForm.valid){

        this.userService.onSignUp(this.signupForm.value)
        .subscribe(
          response => console.log('Success!',response),
          error => console.error('error')
        );

        this.signupForm.reset();
        this.snackBar.open('You have successfully regjistered!', 'OK', {
          duration: 2500,
          verticalPosition: 'top'
         });
        this.router.navigate(['/home']);
      } else {

        this.snackBar.open('Please fill in your credentials!', 'OK', {
          duration: 2500,
          verticalPosition: 'top'
         });
      }

    
  }

}
