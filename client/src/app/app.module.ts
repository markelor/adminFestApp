import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
//import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { AppTranslationModule } from './app.translation.module';
import { HttpClientModule, HttpClientJsonpModule} from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    ReactiveFormsModule,
    PagesModule,
    AppRoutingModule,
    AppTranslationModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
