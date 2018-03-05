import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplatesRoutingModule }  from './templates.routing';
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
  	ModalComponent
  ],
  exports: [
    ModalComponent
    ],
   providers:[
   	GroupByPipe,SpacePipe,BindContentPipe,{provide: COMPOSITION_BUFFER_MODE, useValue: false}
   ],
  entryComponents: [
    ModalComponent
  ]
})
export class TemplatesModule { } 


