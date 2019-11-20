import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material'

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  public isLoggedin = false;

  loginForm: FormGroup;

  users: User[] = [];
  index: number;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: [null,Validators.required],
      password: [null,Validators.required]
    });

    this.userService.getUsers().subscribe(data => {
      this.users = data
      console.log(this.users);
    });
  }

  onSubmit(){

    const foundUser = this.users.filter(u => u.username === this.loginForm.value.username && 
                                             u.password === this.loginForm.value.password);
 
    if (foundUser.length) {

      if (foundUser[0].role === 1) {
        this.userService.setAdminTrue();
      }

       this.snackBar.open('You have successfully logged in !', 'OK', {
        duration: 3500,
        verticalPosition: 'top'
       } );

       this.loginForm.reset();
       this.userService.isLoggedIn();
       this.router.navigate(['/home']);
    } else {
      this.snackBar.open('Your Username or Password is incorrect! Please try again !', 'OK', {
        duration: 3500,
        verticalPosition: 'top'
       } );
      
    } 
  
    console.log(this.userService.getAdminStatus());

  }

}
