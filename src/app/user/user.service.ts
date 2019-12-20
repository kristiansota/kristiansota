import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';


@Injectable()
export class UserService {

  isLoggedin = false;
  private isAdmin = false;
  users: User[] = [];
  actualUserId: number;

  // currentUser: Observable<User>;

  _url = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {
    this.getUsers().subscribe(data => {
      this.users = data
      console.log(data);
  });
   }

   getUsers(): Observable <User[]>{
    return this.http.get<User[]>(this._url);
}

  onSignUp(userData) {
    return this.http.post<any>(this._url,userData);
  }

  onDeleteUser(user: User): Observable<void>{
    return this.http.delete<void>(`http://localhost:3000/users/${user.id}`);
  }

  onUpdateUser(user: User){
    return this.http.put<any>(`http://localhost:3000/users/${user.id}`,user);
}

  isLoggedIn(user: User){
   this.isLoggedin = true;
   this.actualUserId = user.id
   localStorage.setItem('isLoggedin', JSON.stringify(this.isLoggedin));
   localStorage.setItem('actualUserId', JSON.stringify(this.actualUserId));
  }
  
  isNotLoggedIn(){
   this.isLoggedin = false;
   this.actualUserId = null;
   
   localStorage.removeItem('isLoggedin');
   localStorage.removeItem('actualUserId');
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

  getActualUserId() {
    this.actualUserId = JSON.parse(localStorage.getItem('actualUserId'));
    return this.actualUserId;
  }

  isAuthenticated(){

    const authObservable = Observable.create(observer => {
      observer.next(JSON.parse(localStorage.getItem('isLoggedin')));
    });

    return authObservable;
  }


}
