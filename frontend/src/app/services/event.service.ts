import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  // Find events from an user given a date
  getEventsByDate(username, date){
    return this.http.get(`${this.uri}/events/list-events/${username}/${date}`);
  }

  // Find all events from an user
  getUserEvents(username){
    return this.http.get(`${this.uri}/events/list-all-events/${username}`);
  }

  // Find an specific event
  getEventById(id){
    return this.http.get(`${this.uri}/events/${id}`);
  }

  // Add an event
  addEvent(description, dateBegin, dateEnd, username){
    const event = {
      description: description,
      dateBegin: dateBegin,
      dateEnd: dateEnd,
      username: username
    };

    return this.http.post(`${this.uri}/events/add-event`, event);
  }

  // Update an event
  updateEvent(id, description, dateBegin, dateEnd, username){
    const event = {
      description: description,
      dateBegin: dateBegin,
      dateEnd: dateEnd,
      username: username
    };

    return this.http.post(`${this.uri}/events/edit-event/${id}`, event);
  }

  // Delete an event
  deleteEvent(id){
    return this.http.delete(`${this.uri}/events/delete-event/${id}`);
  }
}
