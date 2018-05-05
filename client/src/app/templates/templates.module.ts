
export  class CreateModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplatesRoutingModule }  from './templates.routing';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import { ModalComponent } from './modal/modal.component';
import { SharedModule } from "../shared/shared.module";
import { GroupByPipe } from '../shared/pipes/group-by.pipe';
import { SpacePipe } from '../shared/pipes/space.pipe';
import { BindContentPipe } from '../shared/pipes/bind-content.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { EventFormComponent } from './event-form/event-form.component';
import { FileUploadModule } from 'ng2-file-upload';
import { MapModule } from '../pages/map/map.module';
import { AgmCoreModule } from '@agm/core';
import { MomentModule } from 'ngx-moment';
// Import the Froala Editor plugin.
import "froala-editor/js/froala_editor.pkgd.min.js";
// Import Angular plugin.
import { FroalaEditorModule, FroalaViewModule,FroalaEditorDirective, FroalaViewDirective } from 'angular-froala-wysiwyg';
@NgModule({
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,AgmCoreModule,MomentModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),FileUploadModule,MapModule,
    SharedModule,TranslateModule,TemplatesRoutingModule,NgbModule
  ],
  declarations: [
  	NavbarComponent,SidebarComponent,RightSidebarComponent,ModalComponent, EventFormComponent
  ],
  exports: [
    NavbarComponent,SidebarComponent,RightSidebarComponent,ModalComponent,EventFormComponent
    ],
   providers:[
   	GroupByPipe,SpacePipe,BindContentPipe,{provide: COMPOSITION_BUFFER_MODE, useValue: false}
   ],
  entryComponents: [
    ModalComponent
  ]
})
export class TemplatesModule { } 


