import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule, LocalizeRouterSettings, LocalizeParser } from 'localize-router';
import { LocalizeRouterHttpLoader } from 'localize-router-http-loader';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ModuleWithProviders } from '@angular/core';
import { PagesComponent } from './pages/pages.component';
import { AuthenticationComponent} from './pages/authentication/authentication.component';

export function HttpLoaderFactory(translate: TranslateService, location: Location, settings: LocalizeRouterSettings, http: HttpClient) {
  return new LocalizeRouterHttpLoader(translate, location, settings, http);
}
 const routes: Routes = [
  { path: '', component: PagesComponent, pathMatch: 'full' },
  { path: '**', component: PagesComponent }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    LocalizeRouterModule.forRoot(routes, {
      parser: {
        provide: LocalizeParser,
        useFactory: HttpLoaderFactory,
        deps: [TranslateService, Location, LocalizeRouterSettings, HttpClient]
      }
    })
  ],
  exports: [ RouterModule, LocalizeRouterModule ]
})

export class AppRoutingModule {}



/*@NgModule({
  imports: [
    CommonModule,RouterModule.forRoot(routes , { useHash: false })
  ],
  exports:[RouterModule],
  declarations: []
})
export class AppRoutingModule { }*/
