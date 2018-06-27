import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common"
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ApplicationRoutingModule }  from './application.routing';
import { CreateApplicationComponent } from './create-application/create-application.component';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule} from "../../shared/shared.module";
import { TemplatesModule } from '../../templates/templates.module';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { SeeApplicationsComponent } from './manage-applications/see-applications/see-applications.component';
import { EditEventsApplicationComponent } from './manage-applications/see-applications/edit-events-application/edit-events-application.component';
import { ManageApplicationsComponent } from './manage-applications/manage-applications.component';
@NgModule({
  imports: [
  	CommonModule,FormsModule,ReactiveFormsModule,TranslateModule,SharedModule,TemplatesModule,
    ApplicationRoutingModule,DataTablesModule,NgbModule
  ],
  declarations: [CreateApplicationComponent, ManageApplicationsComponent,SeeApplicationsComponent,EditEventsApplicationComponent],
  providers: [
   {provide: COMPOSITION_BUFFER_MODE, useValue: false}
  ],
    entryComponents: [
  ]
})
export  class ApplicationModule { }
