import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { CreateEventComponent } from './create-event/create-event.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { AuthGuard } from '../guards/auth.guard';
import { ModeratorGuard } from '../guards/moderator.guard';

const routes: Routes = [
	{ path: '', component: CreateEventComponent,canActivate:[AuthGuard], pathMatch: 'full' },
	{ path: 'category-route', component: CreateCategoryComponent,canActivate:[ModeratorGuard] },
	{ path: 'event-route', component: CreateEventComponent,canActivate:[AuthGuard] },
	
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    LocalizeRouterModule.forChild(<any> routes)
  ],
  exports: [ RouterModule, LocalizeRouterModule ]
})
export class CreateRoutingModule { }