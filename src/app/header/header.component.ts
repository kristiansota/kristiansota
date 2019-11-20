import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { MatSnackBar } from '@angular/material'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  getLoginStatus(){
    return this.userService.getLoginStatus();
  }


  logout(){
    this.userService.isNotLoggedIn();
    this.userService.setAdminFalse();
    this.snackBar.open('You have logged out !', 'OK', {
      duration: 5000,
      verticalPosition: 'top'
     } );
    console.log(this.userService.getLoginStatus());
  }

}
