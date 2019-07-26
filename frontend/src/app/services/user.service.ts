import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  //TODO: LOGIN AND REGISTER
  
  login(user){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${this.uri}/users/login/`, user);
  }

  register(user){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.uri}/users/register/`, user, {headers: headers});
    //return this.http.post<User>("${this.uri}//users/register/",
  }

  
}
