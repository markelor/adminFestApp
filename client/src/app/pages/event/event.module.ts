import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common"
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { EventRoutingModule }  from './event.routing';
import { SeeEventComponent } from './see-event/see-event.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { EditEventComponent } from './manage-events/edit-event/edit-event.component';
import { DataTablesModule } from 'angular-datatables';
import { MapModule } from '../map/map.module';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule} from "../../shared/shared.module";
import { TemplatesModule } from '../../templates/templates.module';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { ManageEventsComponent } from './manage-events/manage-events.component';
import { NgxGalleryModule } from 'ngx-gallery';
import { ShareButtonsModule } from '@ngx-share/buttons';

@NgModule({
  imports: [
  	CommonModule,FormsModule,EventRoutingModule,ReactiveFormsModule,TranslateModule,SharedModule,TemplatesModule,DataTablesModule,NgbModule,NgxGalleryModule,ShareButtonsModule.forRoot(),MapModule
  ],
  declarations: [SeeEventComponent,CreateEventComponent, ManageEventsComponent,EditEventComponent],
  providers: [
   {provide: COMPOSITION_BUFFER_MODE, useValue: false}
  ],
    entryComponents: [
  ]
})
export  class EventModule { }
