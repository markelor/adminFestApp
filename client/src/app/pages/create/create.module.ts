import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common"
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CreateRoutingModule }  from './create.routing';
import { CreateEventComponent } from './create-event/create-event.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CreateApplicationComponent } from './create-application/create-application.component';
import { CategoryModalComponent } from './create-category/category-modal/category-modal.component';
import { ApplicationModalComponent } from './create-application/application-modal/application-modal.component';
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
  declarations: [CreateEventComponent,CategoryModalComponent,CreateCategoryComponent,CreateApplicationComponent,ApplicationModalComponent],
  providers: [
   {provide: COMPOSITION_BUFFER_MODE, useValue: false}
  ],
    entryComponents: [
    CategoryModalComponent
  ]
})
export  class CreateModule { }
