import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { LoggedService } from '../../services/logged.service';
import { NgFlashMessageService } from 'ng-flash-messages';

import { Event } from '../../event.model';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  id: String;
  description: String;
  dateBegin: Date;
  dateEnd: Date;
  
  event: any = {};

  constructor(private eventService: EventService,
    private router: Router,
    private loggedService: LoggedService,
    private ngFlashMessageService: NgFlashMessageService,
    private route: ActivatedRoute) { 
      //this.updateForm();
    }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log("init");
      this.id = params.id;
      console.log(this.id);
      this.eventService.getEventById(this.id).subscribe(res => {
        console.log(res);
        this.event = res;
        this.description = this.event.description;
        //this.dateBegin = this.event.dateBegin;
        //this.dateEnd = this.event.dateEnd;
      });
    });
  }

  onEditSubmit(){
    const username = this.loggedService.getUser();
    this.eventService.updateEvent(this.id, this.description, this.dateBegin, this.dateEnd, username)
    .subscribe(() => {
        this.ngFlashMessageService.showFlashMessage({
          messages: ["Evento editado com sucesso!"],
          dismissible: true,
          timeout: 3000,
          type: 'success'
        });
        this.router.navigate([`/list-all-events/${username}`]);
    });
  }

}
