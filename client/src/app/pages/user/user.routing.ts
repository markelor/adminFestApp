import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { ProfileComponent } from './profile/profile.component';
import { SeeEventsComponent } from './see-events/see-events.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { AuthGuard } from '../guards/auth.guard';


const routes: Routes = [
	{ path: '', component: ProfileComponent,canActivate:[AuthGuard], pathMatch: 'full' },
	{ path: 'profile-route', component: ProfileComponent,canActivate:[AuthGuard] },
	{ path: 'event-route', component: SeeEventsComponent,canActivate:[AuthGuard] },
	{ path: 'event-route/edit-route/:id', component: EditEventComponent,canActivate:[AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    LocalizeRouterModule.forChild(<any> routes)
  ],
  exports: [ RouterModule, LocalizeRouterModule ]
})
export class UserRoutingModule { }