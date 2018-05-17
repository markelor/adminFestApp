import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { ProfileComponent } from './profile/profile.component';
import { EventsComponent } from './events/events.component';
import { ApplicationsComponent } from './applications/applications.component';
import { SeeEventsComponent } from './events/see-events/see-events.component';
import { EditEventComponent } from './events/see-events/edit-event/edit-event.component';
import { EditEventsApplicationComponent } from './applications/see-applications/edit-events-application/edit-events-application.component';
import { AuthGuard } from '../guards/auth.guard';


const routes: Routes = [
	{ path: '', component: ProfileComponent,canActivate:[AuthGuard], pathMatch: 'full' },
	{ path: 'profile-route', component: ProfileComponent,canActivate:[AuthGuard] },
	{ path: 'events-route', component: EventsComponent,canActivate:[AuthGuard] },
	{ path: 'applications-route', component: ApplicationsComponent,canActivate:[AuthGuard] },
	{ path: 'events-route/edit-route/:id', component: EditEventComponent,canActivate:[AuthGuard] },
	{ path: 'applications-route/:id/edit-events-route', component: EditEventsApplicationComponent,canActivate:[AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    LocalizeRouterModule.forChild(<any> routes)
  ],
  exports: [ RouterModule, LocalizeRouterModule ]
})
export class UserRoutingModule { }