import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PagesRoutingModule } from './pages.routing.module';
import { PagesComponent } from './pages.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';
import { ModeratorGuard } from './guards/moderator.guard';
import { AuthService } from '../services/auth.service';
import { ObservableService } from '../services/observable.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TemplatesModule} from "../templates/templates.module";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../services/auth.interceptor';

@NgModule({
  imports: [
    CommonModule,TranslateModule,PagesRoutingModule,TemplatesModule,NgbModule.forRoot()
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
   AuthService,ObservableService,AuthGuard,NotAuthGuard,UserGuard,ModeratorGuard,AdminGuard]
})
export class PagesModule { }
