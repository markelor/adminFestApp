import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { LocalizeRouterService } from 'localize-router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
@Injectable()
export class AplicationService {
  public domain = this.authService.domain;
  public route;

  constructor(
    private authService: AuthService,
    private localizeService:LocalizeRouterService,
    private http: HttpClient
  ) { }
  // Function to create a new aplication post
  public newAplication(aplication) {
    return this.http.post<any>(this.domain + 'aplication/newAplication', aplication);
  }
  // Function to get aplication from the database
  public getAplication(id,username,language) {
    this.route= encodeURIComponent(id) +'/'+encodeURIComponent(username)+'/';
    return this.http.get<any>(this.domain + 'aplication/getAplication/'+this.route+language);
  }
  // Function to get all user aplications from the database
  public getAllUserAplications(username,language) {
    this.route= encodeURIComponent(username) +'/';
    return this.http.get<any>(this.domain + 'aplication/allUserAplications/'+this.route+language);
  }
  // Function to edit/update theme post
  public editAplication(aplication) {
    return this.http.put<any>(this.domain + 'aplication/editAplication',aplication);
  }
}