import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { UserComponent } from './user.component';
import { EditEventComponent } from './events/see-events/edit-event/edit-event.component';
import { EditEventsApplicationComponent } from './applications/see-applications/edit-events-application/edit-events-application.component';
import { AuthGuard } from '../guards/auth.guard';


const routes: Routes = [
	{ path: '', component: UserComponent,canActivate:[AuthGuard], pathMatch: 'full' },
	{ path: 'user-route', component: UserComponent,canActivate:[AuthGuard] },
	{ path: 'events-route/edit-route/:id', component: EditEventComponent,canActivate:[AuthGuard] },
	{ path: 'applications-route/:id/edit-events-route', component: EditEventsApplicationComponent,canActivate:[AuthGuard] },
	{ path: 'services-route/edit-route/:id', component: EditEventComponent,canActivate:[AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    LocalizeRouterModule.forChild(<any> routes)
  ],
  exports: [ RouterModule, LocalizeRouterModule ]
})
export class UserRoutingModule { }