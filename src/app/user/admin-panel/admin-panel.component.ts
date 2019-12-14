import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { MatDialog } from '@angular/material'
import { UserCrudComponent } from './user-crud/user-crud.component';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  users: User[] = [];
  

  constructor(private userService: UserService,
    private dialog: MatDialog
    ) { }

  ngOnInit() {

    this.userService.getUsers().subscribe(data =>{
      this.users = data;
      console.log(this.users);
    });

  }

  deleteUser(i: number){
    this.userService.onDeleteUser(this.users[i]).subscribe( () => {this.users.splice(i,1); 
    console.log("You Deleted an item"); },
    error => {
      console.log(error);
    });
  }

  openDialog(){
    let dialogRef =this.dialog.open(UserCrudComponent, {
      width: '60%',
      height: '60%'
    });

    dialogRef.afterClosed().subscribe(changed => {
      if (changed) {
        this.userService.getUsers()
        .subscribe(data => this.users = data);
      }
    });
  }

  updateUser(user: User) {
    let dialogRef =this.dialog.open(UserCrudComponent, {
      width: '60%',
      height: '80%',
      data: user
    });
    
    dialogRef.afterClosed().subscribe(changed => {
      if (changed) {
        this.userService.getUsers()
        .subscribe(data => this.users = data);
      }
    });
  }



}
