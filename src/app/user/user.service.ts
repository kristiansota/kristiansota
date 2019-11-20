import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';


@Injectable()
export class UserService {

  private isLoggedin = false;
  private isAdmin = false;
  users: User[] = [];

  _url = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {
    this.getUsers().subscribe(data => {
      this.users = data
      console.log(data);
  });
   }

  public getUsers(): Observable <User[]>{
    return this.http.get<User[]>(this._url);
}

  onSignUp(userData) {
    return this.http.post<any>(this._url,userData);
  }

  isLoggedIn(){
   this.isLoggedin = true;
   localStorage.setItem('isLoggedin', JSON.stringify(this.isLoggedin));
  }
  
  isNotLoggedIn(){
   this.isLoggedin = false;
   localStorage.removeItem('isLoggedin');
  }

  getLoginStatus(): boolean{

    if(localStorage.getItem('isLoggedin') === null){
      this.isLoggedin = null;
    } else {
      this.isLoggedin = JSON.parse(localStorage.getItem('isLoggedin'));
    }

    return this.isLoggedin;
  }

  setAdminTrue(){
      this.isAdmin = true;
      localStorage.setItem('isAdmin', JSON.stringify(this.isAdmin));
  }

  setAdminFalse(){
    this.isAdmin = false;
    localStorage.removeItem('isAdmin');
  }

  getAdminStatus(){

    if(localStorage.getItem('isAdmin') === null){
      this.isAdmin = null;
    } else {
      this.isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
    }

    return this.isAdmin;
  }

  isAuthenticated(){

    const authObservable = Observable.create(observer => {
      observer.next(this.isLoggedin);
    });

    return authObservable;
  }

}
