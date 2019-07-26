import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggedService {
  authToken: String;
  user: String;

  constructor() { }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  getUser(){
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
    return this.user;
  }
}
