import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/lang/','.json');
}

const translationOptions = {
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient]
  }
};

@NgModule({
  imports: [HttpClientModule,TranslateModule.forRoot(translationOptions)],
  exports: [TranslateModule],
  providers: [TranslateService]
})
export class AppTranslationModule {
  /*constructor(private translate: TranslateService, private authService:AuthService) {
    translate.addLangs(["en,es,eu"]);
    translate.setDefaultLang('es');
    var language='eu';
    console.log(language);
    if(language){
      translate.use(language);
      authService.storeLanguageData(language);
    }
    else{
      authService.storeLanguageData(language);
      translate.use('es');
    }
  }
  */
}

