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
import { SeeApplicationsComponent } from './applications/see-applications/see-applications.component';
import { EditEventsApplicationComponent } from './applications/see-applications/edit-events-application/edit-events-application.component';
import { ApplicationsComponent } from './applications/applications.component';

@NgModule({
  imports: [
    CommonModule,TranslateModule,UserRoutingModule,FileUploadModule,TemplatesModule,SharedModule
  ],
  declarations: [ProfileComponent,ImageCropperComponent, SettingsComponent, SeeEventsComponent, EditEventComponent, EventsComponent, SeeApplicationsComponent, EditEventsApplicationComponent, ApplicationsComponent],
  providers:[DecodePipe]
})

export class UserModule { }
