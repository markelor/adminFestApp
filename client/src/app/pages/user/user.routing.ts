import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { ProfileComponent } from './profile/profile.component';
import { EventsComponent } from './events/events.component';
import { AplicationsComponent } from './aplications/aplications.component';
import { SeeEventsComponent } from './events/see-events/see-events.component';
import { EditEventComponent } from './events/see-events/edit-event/edit-event.component';
import { EditEventsAplicationComponent } from './aplications/see-aplications/edit-events-aplication/edit-events-aplication.component';
import { AuthGuard } from '../guards/auth.guard';


const routes: Routes = [
	{ path: '', component: ProfileComponent,canActivate:[AuthGuard], pathMatch: 'full' },
	{ path: 'profile-route', component: ProfileComponent,canActivate:[AuthGuard] },
	{ path: 'events-route', component: EventsComponent,canActivate:[AuthGuard] },
	{ path: 'aplications-route', component: AplicationsComponent,canActivate:[AuthGuard] },
	{ path: 'events-route/edit-route/:id', component: EditEventComponent,canActivate:[AuthGuard] },
	{ path: 'aplications-route/:id/edit-events-route', component: EditEventsAplicationComponent,canActivate:[AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    LocalizeRouterModule.forChild(<any> routes)
  ],
  exports: [ RouterModule, LocalizeRouterModule ]
})
export class UserRoutingModule { }