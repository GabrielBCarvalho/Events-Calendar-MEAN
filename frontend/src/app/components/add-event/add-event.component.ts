import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidateService } from '../../services/validate.service';
import { EventService } from '../../services/event.service';
import { LoggedService } from '../../services/logged.service';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  description: String;
  dateBegin: Date;
  dateEnd: Date;

  constructor(private eventService: EventService,
    private router: Router,
    private validateService: ValidateService,
    private loggedService: LoggedService,
    private ngFlashMessageService: NgFlashMessageService ) { }

  ngOnInit() {
  }

  onAddSubmit(){
    const username = this.loggedService.getUser();
    this.eventService.addEvent(this.description, this.dateBegin, this.dateEnd, username)
    .subscribe((data) => {
      if(data){
        this.ngFlashMessageService.showFlashMessage({
          messages: ["Evento cadastrado com sucesso!"],
          dismissible: true,
          timeout: 3000,
          type: 'success'
        });
        this.router.navigate([`/list-all-events/${username}`]);
      }
      else{
        this.ngFlashMessageService.showFlashMessage({
          messages: ["Houve um erro. Por favor, tente novamente."],
          dismissible: true,
          timeout: 3000,
          type: 'danger'
        });

        this.router.navigate([`/list-all-events/${username}`]);
      }
    })
  }
}
