import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
//import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { AppTranslationModule } from './app.translation.module';
import { HttpClientModule, HttpClientJsonpModule} from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
export function tokenGetter() {
  return localStorage.getItem('token');
}
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
    AppTranslationModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        authScheme: 'JWT '
      }
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
