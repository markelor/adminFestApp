import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PagesRoutingModule } from './pages.routing.module';
import { AgmCoreModule } from '@agm/core';
import { PagesComponent } from './pages.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';
import { ModeratorGuard } from './guards/moderator.guard';
import { AuthService } from '../services/auth.service';
import { CategoryService } from '../services/category.service';
import { EventService } from '../services/event.service';
import { PlaceService } from '../services/place.service';
import { ServiceService } from '../services/service.service';
import { FileUploaderService } from '../services/file-uploader.service';
import { ApplicationService } from '../services/application.service';
import { ObservableService } from '../services/observable.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TemplatesModule} from "../templates/templates.module";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../services/auth.interceptor';
import { CategoryInterceptor } from '../services/category.interceptor';
import { EventInterceptor } from '../services/event.interceptor';
import { PlaceInterceptor } from '../services/place.interceptor';
import { ServiceInterceptor } from '../services/service.interceptor';
import { FileUploaderInterceptor } from '../services/file-uploader.interceptor';
import { ApplicationInterceptor } from '../services/application.interceptor';
@NgModule({
  imports: [
    CommonModule,TranslateModule,PagesRoutingModule,TemplatesModule,NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA21VpWm94ik9EItX4mkB1RBxrsdXCH1Mw'
    })
  ],
  declarations: [
    PagesComponent
    ],
    providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CategoryInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: EventInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PlaceInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FileUploaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApplicationInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServiceInterceptor,
      multi: true
    },
   AuthService,CategoryService,EventService,PlaceService,ServiceService,FileUploaderService,ObservableService,ApplicationService,AuthGuard,NotAuthGuard,UserGuard,ModeratorGuard,AdminGuard]
})
export class PagesModule { }
