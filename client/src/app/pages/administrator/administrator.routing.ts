import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { UsersAdministratorComponent } from './users-administrator/users-administrator.component';
import { EventsAdministratorComponent } from './events-administrator/events-administrator.component';
import { ModeratorGuard } from '../guards/moderator.guard';

const routes: Routes = [
	{ path: '', component: UsersAdministratorComponent, pathMatch: 'full',canActivate:[ModeratorGuard] },
	{ path: 'users-route', component: UsersAdministratorComponent,canActivate:[ModeratorGuard] },
	{ path: 'events-route', component: EventsAdministratorComponent,canActivate:[ModeratorGuard] }	

];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    LocalizeRouterModule.forChild(<any> routes)
  ],
  exports: [ RouterModule, LocalizeRouterModule ]
})
export class AdministratorRoutingModule { }

