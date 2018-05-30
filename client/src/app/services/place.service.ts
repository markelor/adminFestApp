import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { LocalizeRouterService } from 'localize-router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
@Injectable()
export class PlaceService {
  public domain = this.authService.domain;
  public route;

  constructor(
    private authService: AuthService,
    private localizeService:LocalizeRouterService,
    private http: HttpClient
  ) { }

  // Function to get all user places from the database
  public getPlacesCoordinates(lat,lng,language) {
    this.route= lat+'/'+lng+'/';
    return this.http.get<any>(this.domain + 'place/getPlacesCoordinates/'+this.route+language);
  }
}