import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home.routing'
import { HomeComponent } from './home.component';
import { SharedModule } from "../../shared/shared.module";
import { TemplatesModule } from "../../templates/templates.module";
import { TranslateModule } from '@ngx-translate/core';
import { BindContentPipe } from '../../shared/pipes/bind-content.pipe';

@NgModule({
  imports: [
    CommonModule,HomeRoutingModule,SharedModule,TemplatesModule,TranslateModule
  ],
  declarations: [HomeComponent],
  providers:[BindContentPipe]
})
export class HomeModule { }
