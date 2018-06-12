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
@NgModule({
  imports: [
  	CommonModule,FormsModule,ReactiveFormsModule,TranslateModule,SharedModule,TemplatesModule,
    ServiceRoutingModule,DataTablesModule,NgbModule
  ],
  declarations: [ServiceModalComponent,CreateServiceComponent],
  providers: [
   {provide: COMPOSITION_BUFFER_MODE, useValue: false}
  ],
    entryComponents: [
    ServiceModalComponent
  ]
})
export  class ServiceModule { }
