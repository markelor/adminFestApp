import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { LocalizeRouterModule} from 'localize-router';
import { PagesComponent } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';
export const routes:Routes=[
	{ path:'',
	  component: PagesComponent,canActivate:[AuthGuard],
	  children:[
	    { path: '', loadChildren: './home/home.module#HomeModule', pathMatch: 'full' },
	    { path: 'admin-route',loadChildren: './administrator/administrator.module#AdministratorModule'}	
	    	
	  ]	
	},
	{ path: '',loadChildren: './authentication/authentication.module#AuthenticationModule'}
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    LocalizeRouterModule.forChild(<any> routes)
  ],
  exports: [ RouterModule, LocalizeRouterModule ]
})
export class PagesRoutingModule { }


