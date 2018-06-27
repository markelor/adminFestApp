import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common"
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { EventRoutingModule }  from './event.routing';
import { CreateEventComponent } from './create-event/create-event.component';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule} from "../../shared/shared.module";
import { TemplatesModule } from '../../templates/templates.module';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { ManageEventsComponent } from './manage-events/manage-events.component';
@NgModule({
  imports: [
  	CommonModule,FormsModule,EventRoutingModule,ReactiveFormsModule,TranslateModule,SharedModule,TemplatesModule,DataTablesModule,NgbModule
  ],
  declarations: [CreateEventComponent, ManageEventsComponent],
  providers: [
   {provide: COMPOSITION_BUFFER_MODE, useValue: false}
  ],
    entryComponents: [
  ]
})
export  class EventModule { }
