import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common"
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CreateRoutingModule }  from './create.routing';
import { AgmCoreModule } from '@agm/core';
import { CreateEventComponent } from './create-event/create-event.component';
// Import the Froala Editor plugin.
import "froala-editor/js/froala_editor.pkgd.min.js";
// Import Angular plugin.
import { FroalaEditorModule, FroalaViewModule,FroalaEditorDirective, FroalaViewDirective } from 'angular-froala-wysiwyg';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CategoryModalComponent } from './create-category/category-modal/category-modal.component';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule} from "../../shared/shared.module";
import { FileUploadModule } from 'ng2-file-upload';
//import { MapModule } from '../map/map.module';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';
@NgModule({
  imports: [
  	CommonModule,FormsModule,ReactiveFormsModule,AgmCoreModule,
  	FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),TranslateModule,SharedModule,
    CreateRoutingModule,FileUploadModule,DataTablesModule,NgbModule/*MapModule*/
  ],
  declarations: [CreateEventComponent,CategoryModalComponent,CreateCategoryComponent],
  providers: [
   {provide: COMPOSITION_BUFFER_MODE, useValue: false}
  ],
    entryComponents: [
    CategoryModalComponent
  ]
})
export  class CreateModule { }
