import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgFlashMessagesModule } from 'ng-flash-messages';
import { MatToolbarModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, 
  MatIconModule, MatButtonModule, MatTableModule, MatDividerModule, MatSnackBarModule, MatCardModule} from '@angular/material';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddEventComponent } from './components/add-event/add-event.component';
import { EditEventComponent } from './components/edit-event/edit-event.component';
import { ListEventsComponent } from './components/list-events/list-events.component';
import { LoginComponent } from './components/login/login.component';
import { ListAllEventsComponent } from './components/list-all-events/list-all-events.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';

import { EventService } from './services/event.service';
import { UserService } from './services/user.service';
import { ValidateService } from './services/validate.service';
import { NavbarComponent } from './components/navbar/navbar.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'add-event', component: AddEventComponent},
  { path: 'edit-event/:id', component: EditEventComponent},
  { path: 'list-events/:userid/:date', component: ListEventsComponent},
  { path: 'list-all-events/:username', component: ListAllEventsComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', redirectTo: '' }
]

@NgModule({
  declarations: [
    AppComponent,
    AddEventComponent,
    EditEventComponent,
    ListEventsComponent,
    LoginComponent,
    ListAllEventsComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatToolbarModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, 
    MatIconModule, MatButtonModule, MatTableModule, MatDividerModule, MatSnackBarModule, MatCardModule,
    HttpClientModule,
    DlDateTimeDateModule,  // <--- Determines the data type of the model
    DlDateTimePickerModule,
    FormsModule,
    NgFlashMessagesModule.forRoot()
  ],
  providers: [EventService, UserService, ValidateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
