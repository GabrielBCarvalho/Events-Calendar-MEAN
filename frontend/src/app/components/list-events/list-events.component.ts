import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

import { Event } from '../../event.model'
import { EventService } from '../../services/event.service';
import { LoggedService } from '../../services/logged.service';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.css']
})
export class ListEventsComponent implements OnInit {
  events: Event[];
  displayedColumns = ['description', 'dateBegin', 'dateEnd'];

  constructor(private eventService: EventService,
    private router: Router,
    private loggedService: LoggedService) { }

  ngOnInit() {
  }

  fetchAllEvents(){
    let username = this.loggedService.getUser();
    this.eventService.getUserEvents(username).subscribe((data: Event[]) => {
      this.events = data;
      console.log("Data requested");
      console.log(this.events);
    });
  }

}
