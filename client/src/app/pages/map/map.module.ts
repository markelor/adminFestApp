import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { MapRoutingModule }  from './map.routing';
import { EventComponent } from './event/event.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from "../../shared/shared.module";
import { BindContentPipe } from '../../shared/pipes/bind-content.pipe';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { EventFormComponent } from './event-form/event-form.component';
@NgModule({
  imports: [
    CommonModule,AgmCoreModule,MapRoutingModule,TranslateModule,SharedModule,AgmSnazzyInfoWindowModule
  ],
  declarations: [EventComponent,EventFormComponent],
  exports: [EventComponent,EventFormComponent],
  providers:[BindContentPipe]
})

export class MapModule { }