import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home.routing'
import { HomeComponent } from './home.component';
import { SharedModule } from "../../shared/shared.module";
import { TemplatesModule } from "../../templates/templates.module";
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,HomeRoutingModule,SharedModule,TemplatesModule,TranslateModule,NgbModule
  ],
  declarations: [HomeComponent],
  providers:[]
})
export class HomeModule { }


