import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common"
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ServiceRoutingModule }  from './service.routing';
import { CreateServiceComponent } from './create-service/create-service.component';
import { ServiceModalComponent } from './create-service/service-modal/service-modal.component';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule} from "../../shared/shared.module";
import { TemplatesModule } from '../../templates/templates.module';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { SeeServicesComponent } from './manage-services/see-services/see-services.component';
import { ManageServicesComponent } from './manage-services/manage-services.component';
import { EditEventComponent } from '../event/manage-events/edit-event/edit-event.component';
import { DecodePipe } from '../../shared/pipes/decode.pipe';
import { InlineSVGModule } from 'ng-inline-svg';
@NgModule({
  imports: [
  	CommonModule,FormsModule,ReactiveFormsModule,TranslateModule,SharedModule,TemplatesModule,
    ServiceRoutingModule,DataTablesModule,NgbModule,InlineSVGModule
  ],
  declarations: [ServiceModalComponent,CreateServiceComponent,SeeServicesComponent, ManageServicesComponent,EditEventComponent],
  providers: [
   {provide: COMPOSITION_BUFFER_MODE, useValue: false},DecodePipe
  ],
    entryComponents: [
    ServiceModalComponent
  ]
})
export  class ServiceModule { }
