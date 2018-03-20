import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { UserAdministratorComponent } from './user-administrator/user-administrator.component';
import { ModeratorGuard } from '../guards/moderator.guard';

const routes: Routes = [
	{ path: '', component: UserAdministratorComponent, pathMatch: 'full',canActivate:[ModeratorGuard] },
	{ path: 'users-route', component: UserAdministratorComponent,canActivate:[ModeratorGuard] },	

];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    LocalizeRouterModule.forChild(<any> routes)
  ],
  exports: [ RouterModule, LocalizeRouterModule ]
})
export class AdministratorRoutingModule { }

