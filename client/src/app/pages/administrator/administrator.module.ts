import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AdministratorRoutingModule }  from './administrator.routing';
import { UserAdministratorComponent } from './user-administrator/user-administrator.component';
import { SharedModule } from "../../shared/shared.module";
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { UserModalComponent } from './user-administrator/user-modal/user-modal.component';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { BindContentPipe } from '../../shared/pipes/bind-content.pipe';
import { GroupByPipe } from '../../shared/pipes/group-by.pipe';
@NgModule({
  imports: [
    CommonModule,FormsModule,
    ReactiveFormsModule,SharedModule,TranslateModule,AdministratorRoutingModule,DataTablesModule,
    NgbModule
  ],
  declarations: [UserAdministratorComponent,UserModalComponent],
  providers: [
   GroupByPipe,BindContentPipe,{provide: COMPOSITION_BUFFER_MODE, useValue: false}
  ],
  entryComponents: [
    UserModalComponent
  ]
})
export class AdministratorModule { }





