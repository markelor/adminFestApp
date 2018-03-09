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
@NgModule({
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,SharedModule,TranslateModule,TemplatesRoutingModule,NgbModule
  ],
  declarations: [
  	NavbarComponent,SidebarComponent,RightSidebarComponent,ModalComponent
  ],
  exports: [
    NavbarComponent,SidebarComponent,RightSidebarComponent,ModalComponent
    ],
   providers:[
   	GroupByPipe,SpacePipe,BindContentPipe,{provide: COMPOSITION_BUFFER_MODE, useValue: false}
   ],
  entryComponents: [
    ModalComponent
  ]
})
export class TemplatesModule { } 


