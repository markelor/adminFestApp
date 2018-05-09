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
import { FileUploaderService } from '../services/file-uploader.service';
import { AplicationService } from '../services/aplication.service';
import { ObservableService } from '../services/observable.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TemplatesModule} from "../templates/templates.module";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../services/auth.interceptor';
import { CategoryInterceptor } from '../services/category.interceptor';
import { EventInterceptor } from '../services/event.interceptor';
import { FileUploaderInterceptor } from '../services/file-uploader.interceptor';
import { AplicationInterceptor } from '../services/aplication.interceptor';
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
      useClass: FileUploaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AplicationInterceptor,
      multi: true
    },
   AuthService,CategoryService,EventService,FileUploaderService,ObservableService,AplicationService,AuthGuard,NotAuthGuard,UserGuard,ModeratorGuard,AdminGuard]
})
export class PagesModule { }
