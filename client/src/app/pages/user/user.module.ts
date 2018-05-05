import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ProfileComponent } from './profile/profile.component';
import { UserRoutingModule } from './user.routing';
import { ImageCropperComponent } from "ngx-img-cropper";
import { FileUploadModule } from 'ng2-file-upload';
import { SettingsComponent } from './profile/settings/settings.component';
import { SeeEventsComponent } from './see-events/see-events.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { TemplatesModule } from '../../templates/templates.module';
import { SharedModule } from '../../shared/shared.module';
import { DecodePipe } from '../../shared/pipes/decode.pipe';

@NgModule({
  imports: [
    CommonModule,TranslateModule,UserRoutingModule,FileUploadModule,TemplatesModule,SharedModule
  ],
  declarations: [ProfileComponent,ImageCropperComponent, SettingsComponent, SeeEventsComponent, EditEventComponent],
  providers:[DecodePipe]
})

export class UserModule { }
