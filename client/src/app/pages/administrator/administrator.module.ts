import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AdministratorRoutingModule }  from './administrator.routing';
import { UsersAdministratorComponent } from './users-administrator/users-administrator.component';
import { SharedModule } from "../../shared/shared.module";
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { UserModalComponent } from './users-administrator/user-modal/user-modal.component';
import { TemplatesModule } from '../../templates/templates.module';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { BindContentPipe } from '../../shared/pipes/bind-content.pipe';
import { GroupByPipe } from '../../shared/pipes/group-by.pipe';
import { EventsAdministratorComponent } from './events-administrator/events-administrator.component';
@NgModule({
  imports: [
    CommonModule,FormsModule,
    ReactiveFormsModule,SharedModule,TranslateModule,AdministratorRoutingModule,DataTablesModule,
    NgbModule,TemplatesModule
  ],
  declarations: [UsersAdministratorComponent,UserModalComponent, EventsAdministratorComponent],
  providers: [
   GroupByPipe,BindContentPipe,{provide: COMPOSITION_BUFFER_MODE, useValue: false}
  ],
  entryComponents: [
    UserModalComponent
  ]
})
export class AdministratorModule { }





