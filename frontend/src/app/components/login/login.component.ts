import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';
import { LoggedService } from '../../services/logged.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(private userService: UserService,
    private router: Router,
    private ngFlashMessageService: NgFlashMessageService,
    private loggedService: LoggedService) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }

    this.userService.login(user).subscribe(data => {
      if(data){
        let token = "";
        this.loggedService.storeUserData(token, user.username);

        this.ngFlashMessageService.showFlashMessage({
          messages: [`${user.username} logado com sucesso!`],
          dismissible: true,
          timeout: 3000,
          type: 'success'
        });

        this.router.navigate([`/list-all-events/${user.username}`]);
      }
    });
  }

}
