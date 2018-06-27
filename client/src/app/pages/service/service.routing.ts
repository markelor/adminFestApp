import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { CreateServiceComponent } from './create-service/create-service.component';
import { AuthGuard } from '../guards/auth.guard';
import { ModeratorGuard } from '../guards/moderator.guard';
import { ManageServicesComponent } from './manage-services/manage-services.component';
import { EditEventComponent } from '../event/manage-events/edit-event/edit-event.component';

const routes: Routes = [
	{ path: '', component: CreateServiceComponent,canActivate:[AuthGuard], pathMatch: 'full' },
	{ path: 'create-route', component: CreateServiceComponent,canActivate:[ModeratorGuard] },
	{ path: 'manage-route', component: ManageServicesComponent,canActivate:[AuthGuard] },	
	{ path: 'services-route/edit-route/:id', component: EditEventComponent,canActivate:[AuthGuard] },
	
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    LocalizeRouterModule.forChild(<any> routes)
  ],
  exports: [ RouterModule, LocalizeRouterModule ]
})
export class ServiceRoutingModule { }