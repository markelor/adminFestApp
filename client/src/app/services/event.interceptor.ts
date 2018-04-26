import { Injectable,Injector } from '@angular/core';
import { LocalizeRouterService } from 'localize-router';
import {AuthService} from './auth.service';
import {EventService} from './event.service';
import {HttpRequest,HttpHandler,HttpEvent,HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EventInterceptor implements HttpInterceptor {
  private authService;
  private themeService;
  private localizeService;
  constructor(private injector: Injector) {}


   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     this.authService = this.injector.get(AuthService);
     this.themeService = this.injector.get(EventService);
     this.localizeService=this.injector.get(LocalizeRouterService);
     console.log(request.url);
     if(request.url==="assets/i18n/lang.json"){

     }else if(request.url==="http://localhost:8080/themes/allThemes/"+this.localizeService.parser.currentLang){
        request = request.clone({
          setHeaders: {
            'Content-Type': 'application/json', // Format set to JSON
            'language':this.localizeService.parser.currentLang
          }
        });
        
     }else if(request.url==="http://localhost:8080/themes/allThemesThematic/"+this.themeService.route+this.localizeService.parser.currentLang){
        request = request.clone({
          setHeaders: {
            'Content-Type': 'application/json', // Format set to JSON
            'language':this.localizeService.parser.currentLang,
            'route':this.themeService.route
          }
        });
     }else if(request.url==="http://localhost:8080/themes/allThemesTheme/"+this.themeService.route+this.localizeService.parser.currentLang){
        request = request.clone({
          setHeaders: {
            'Content-Type': 'application/json', // Format set to JSON
            'language':this.localizeService.parser.currentLang,
            'route':this.themeService.route
          }
        });
     }
     else if(request.url==="http://localhost:8080/themes/allThemesClass/"+this.themeService.route+this.localizeService.parser.currentLang){
        request = request.clone({
          setHeaders: {
            'Content-Type': 'application/json', // Format set to JSON
            'language':this.localizeService.parser.currentLang,
            'route':this.themeService.route
          }
        });
        
     }else if(request.url==="http://localhost:8080/themes/allThemesRegion/"+this.themeService.route+this.localizeService.parser.currentLang){
        request = request.clone({
          setHeaders: {
            'Content-Type': 'application/json', // Format set to JSON
            'language':this.localizeService.parser.currentLang,
            'route':this.themeService.route
          }
        });
        
     }else if(request.url==="http://localhost:8080/themes/singleTheme/"+this.themeService.route+this.localizeService.parser.currentLang){
        request = request.clone({
          setHeaders: {
            'Content-Type': 'application/json', // Format set to JSON
            'language':this.localizeService.parser.currentLang,
            'route':this.themeService.route
          }
        });
        
     }else if(request.url==="http://localhost:8080/themes/allThemesSearch/"+this.themeService.route+this.localizeService.parser.currentLang){
        request = request.clone({
          setHeaders: {
            'Content-Type': 'application/json', // Format set to JSON
            'language':this.localizeService.parser.currentLang,
            'route':this.themeService.route
          }
        });   
     }else if(request.url==="http://localhost:8080/event/newEvent"){
        request = request.clone({
          setHeaders: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+this.authService.authToken, // Attach token
            'language':this.localizeService.parser.currentLang
          }
        }); 
     }else if(request.url==="http://localhost:8080/themes/deleteTheme/"+this.themeService.route+this.localizeService.parser.currentLang){
        request = request.clone({
          setHeaders: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+this.authService.authToken, // Attach token
            'language':this.localizeService.parser.currentLang
          }
        }); 
     }else if(request.url==="http://localhost:8080/themes/addReactionTheme"){
        request = request.clone({
          setHeaders: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+this.authService.authToken, // Attach token
            'language':this.localizeService.parser.currentLang
          }
        });
     
     }else if(request.url==="http://localhost:8080/themes/deleteReactionTheme"){
        request = request.clone({
          setHeaders: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+this.authService.authToken, // Attach token
            'language':this.localizeService.parser.currentLang
          }
        });
     
     }else{

       
        /*request = request.clone({
          setHeaders: {
            'Content-Type': 'application/json', // Format set to JSON
            'authorization': this.authService.authToken, // Attach token
            'language':this.localizeService.parser.currentLang
          }
        });
        */
     }
   

    return next.handle(request);
  } 
}
