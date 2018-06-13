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
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { EventFormComponent } from './forms/event-form/event-form.component';
import { CategoryFormComponent } from './forms/category-form/category-form.component';
import { ServiceFormComponent } from './forms/service-form/service-form.component';
import { FileUploadModule } from 'ng2-file-upload';
import { MapModule } from '../pages/map/map.module';
import { AgmCoreModule } from '@agm/core';
import { MomentModule } from 'ngx-moment';
// Import the Froala Editor plugin.
import "froala-editor/js/froala_editor.pkgd.min.js";
// Import Angular plugin.
import { FroalaEditorModule, FroalaViewModule,FroalaEditorDirective, FroalaViewDirective } from 'angular-froala-wysiwyg';
import { ApplicationFormComponent } from './forms/application-form/application-form.component';
import { FormsComponent } from './forms/forms.component';
import { EventsApplicationFormComponent } from './forms/events-application-form/events-application-form.component';
@NgModule({
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,AgmCoreModule,MomentModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),FileUploadModule,MapModule,
    SharedModule,TranslateModule,TemplatesRoutingModule,DataTablesModule,NgbModule
  ],
  declarations: [
  	NavbarComponent,SidebarComponent,RightSidebarComponent,ModalComponent, EventFormComponent, ApplicationFormComponent,CategoryFormComponent, FormsComponent, EventsApplicationFormComponent,ServiceFormComponent
  ],
  exports: [
    NavbarComponent,SidebarComponent,RightSidebarComponent,ModalComponent,EventFormComponent,ApplicationFormComponent,CategoryFormComponent, FormsComponent, EventsApplicationFormComponent,ServiceFormComponent
    ],
   providers:[
   	GroupByPipe,SpacePipe,BindContentPipe,{provide: COMPOSITION_BUFFER_MODE, useValue: false}
   ],
  entryComponents: [
    ModalComponent
  ]
})
export class TemplatesModule { } 


