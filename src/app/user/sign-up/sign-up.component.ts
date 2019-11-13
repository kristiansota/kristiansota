import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  
  constructor(private fb: FormBuilder,
              private userService: UserService) { }

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

        alert('This username has been taken');
      }
      
      else if (this.users.filter(u => u.email === this.signupForm.value.email).length){

        alert('This email address has already been registered');
      }

      else{

        this.userService.onSignUp(this.signupForm.value)
        .subscribe(
          response => console.log('Success!',response),
          error => console.error('error')
        );

        this.signupForm.reset();
      }//else

    
  }

}
