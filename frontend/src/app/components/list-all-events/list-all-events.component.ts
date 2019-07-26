import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { NgFlashMessageService } from 'ng-flash-messages';

import { Event } from '../../event.model'
import { EventService } from '../../services/event.service';
import { LoggedService } from '../../services/logged.service';

@Component({
  selector: 'app-list-all-events',
  templateUrl: './list-all-events.component.html',
  styleUrls: ['./list-all-events.component.css']
})
export class ListAllEventsComponent implements OnInit {
  events: Event[];
  displayedColumns = ['description', 'dateBegin', 'dateEnd'];
  headElements = ['Descrição', 'Data de início', 'Data de término', 'Ações'];

  constructor(private eventService: EventService,
    private router: Router,
    private loggedService: LoggedService,
    private ngFlashMessageService: NgFlashMessageService) { }

  ngOnInit() {
    this.fetchAllEvents();
  }

  fetchAllEvents(){
    let username = this.loggedService.getUser();
    console.log(username);
    this.eventService.getUserEvents(username).subscribe((data: Event[]) => {
      this.events = data;
      console.log("Data requested");
      console.log(this.events);
    });
  }

  editEvent(id){
    this.router.navigate([`/edit-event/${id}`]);
  }

  deleteEvent(id){
    this.eventService.deleteEvent(id).subscribe(() => {
      this.fetchAllEvents();
      this.ngFlashMessageService.showFlashMessage({
        messages: ["Evento deletado com sucesso!"],
        dismissible: true,
        timeout: 3000,
        type: 'success'
      });
    })
  }

}
