import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ProfileComponent } from './profile/profile.component';
import { UserRoutingModule } from './user.routing';
import { ImageCropperComponent } from "ngx-img-cropper";
import { FileUploadModule } from 'ng2-file-upload';
import { SettingsComponent } from './profile/settings/settings.component';

@NgModule({
  imports: [
    CommonModule,TranslateModule,UserRoutingModule,FileUploadModule
  ],
  declarations: [ProfileComponent,ImageCropperComponent, SettingsComponent]
})

export class UserModule { }
