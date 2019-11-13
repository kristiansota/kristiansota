import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';


@Injectable()
export class UserService {

  _url = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {
    this.getUsers().subscribe(data => {
      console.log(data);
  });
   }

  public getUsers(): Observable <User[]>{
    return this.http.get<User[]>(this._url);
}

  onSignUp(userData) {
    return this.http.post<any>(this._url,userData);
  }

}
