import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ProfileComponent } from './profile/profile.component';
import { UserRoutingModule } from './user.routing';
import { ImageCropperComponent } from "ngx-img-cropper";
import { FileUploadModule } from 'ng2-file-upload';
import { SettingsComponent } from './profile/settings/settings.component';
import { SeeEventsComponent } from './events/see-events/see-events.component';
import { EditEventComponent } from './events/see-events/edit-event/edit-event.component';
import { TemplatesModule } from '../../templates/templates.module';
import { SharedModule } from '../../shared/shared.module';
import { DecodePipe } from '../../shared/pipes/decode.pipe';
import { EventsComponent } from './events/events.component';
import { AddEventsAplicationComponent } from './events/add-events-aplication/add-events-aplication.component';

@NgModule({
  imports: [
    CommonModule,TranslateModule,UserRoutingModule,FileUploadModule,TemplatesModule,SharedModule
  ],
  declarations: [ProfileComponent,ImageCropperComponent, SettingsComponent, SeeEventsComponent, EditEventComponent, EventsComponent, AddEventsAplicationComponent],
  providers:[DecodePipe]
})

export class UserModule { }
