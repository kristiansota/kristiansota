import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  public isLoggedin = false;

  loginForm: FormGroup;

  users: User[] = [];

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router) { }

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

    if(this.users.filter(u => u.username === this.loginForm.value.username && 
                              u.password === this.loginForm.value.password).length){

       alert('You have successfuly loged in!');
       this.router.navigate(['/home']);
       this.loginForm.reset();
    } //if
    else {

      alert('Your Username or Password is incorrect! Please try again!');
    } //else
  }

}
