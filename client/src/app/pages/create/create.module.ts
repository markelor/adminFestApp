import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common"
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CreateRoutingModule }  from './create.routing';
import { CreateEventComponent } from './create-event/create-event.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CreateAplicationComponent } from './create-aplication/create-aplication.component';
import { CategoryModalComponent } from './create-category/category-modal/category-modal.component';
import { AplicationModalComponent } from './create-aplication/aplication-modal/aplication-modal.component';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule} from "../../shared/shared.module";
import { TemplatesModule } from '../../templates/templates.module';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';
@NgModule({
  imports: [
  	CommonModule,FormsModule,ReactiveFormsModule,TranslateModule,SharedModule,TemplatesModule,
    CreateRoutingModule,DataTablesModule,NgbModule
  ],
  declarations: [CreateEventComponent,CategoryModalComponent,CreateCategoryComponent,CreateAplicationComponent,AplicationModalComponent],
  providers: [
   {provide: COMPOSITION_BUFFER_MODE, useValue: false}
  ],
    entryComponents: [
    CategoryModalComponent
  ]
})
export  class CreateModule { }
