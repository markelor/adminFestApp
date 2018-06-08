import { Injectable,Injector } from '@angular/core';
import { LocalizeRouterService } from 'localize-router';
import {AuthService} from './auth.service';
import {PlaceService} from './place.service';
import {HttpRequest,HttpHandler,HttpEvent,HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PlaceInterceptor implements HttpInterceptor {
  private authService;
  private placeService;
  private localizeService;
  constructor(private injector: Injector) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this.authService = this.injector.get(AuthService);
      this.placeService = this.injector.get(PlaceService);
      this.localizeService=this.injector.get(LocalizeRouterService);
     
      if(request.url==="http://localhost:8080/place/getPlacesCoordinates/"+this.placeService.route+this.placeService.language){
        request = request.clone({
          setHeaders: {
            'Content-Type': 'application/json', // Format set to JSON
            'language':this.placeService.language,
            'route':this.placeService.route
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
