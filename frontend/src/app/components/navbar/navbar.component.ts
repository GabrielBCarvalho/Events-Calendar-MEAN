import { Component, OnInit } from '@angular/core';
import { LoggedService } from '../../services/logged.service';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private loggedService: LoggedService,
    private router: Router,
    private ngFlashMessageService: NgFlashMessageService) { }

  ngOnInit() {
  }

  onLogoutClick(){
    this.loggedService.logout();
    this.ngFlashMessageService.showFlashMessage({
      messages: ["Você foi desconectado."],
      dismissible: true,
      timeout: 3000,
      type: 'success'
    });
    this.router.navigate(['/login']);
    return false;
  }
}
