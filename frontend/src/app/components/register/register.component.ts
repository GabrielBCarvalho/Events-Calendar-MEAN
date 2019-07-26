import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  password: String;

  constructor(private validateService: ValidateService, 
    private ngFlashMessageService: NgFlashMessageService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      username: this.username,
      password: this.password
    };

    // Check required fields
    if(!this.validateService.validateRegister(user)){
      this.ngFlashMessageService.showFlashMessage({
        messages: ["Por favor, preencha todos os campos."],
        dismissible: true,
        timeout: 3000,
        type: 'danger'
      });
      return false;
    }

    // Register user
    this.userService.register(user).subscribe(data => {
      if(data){
        this.ngFlashMessageService.showFlashMessage({
          messages: ["Usuário cadastrado com sucesso. Agora você pode logar!"],
          dismissible: true,
          timeout: 3000,
          type: 'success'
        });

        this.router.navigate(['/login']);
      }
      else{
        this.ngFlashMessageService.showFlashMessage({
          messages: ["Houve um erro. Por favor, tente novamente."],
          dismissible: true,
          timeout: 3000,
          type: 'danger'
        });

        this.router.navigate(['/register']);
      }

    });
  }

}
