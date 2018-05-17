import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { LocalizeRouterService } from 'localize-router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
@Injectable()
export class ApplicationService {
  public domain = this.authService.domain;
  public route;

  constructor(
    private authService: AuthService,
    private localizeService:LocalizeRouterService,
    private http: HttpClient
  ) { }
  // Function to create a new application post
  public newApplication(application) {
    return this.http.post<any>(this.domain + 'application/newApplication', application);
  }
  // Function to get application from the database
  public getApplication(id,username,language) {
    this.route= encodeURIComponent(id) +'/'+encodeURIComponent(username)+'/';
    return this.http.get<any>(this.domain + 'application/getApplication/'+this.route+language);
  }
  // Function to get all user applications from the database
  public getAllUserApplications(username,language) {
    this.route= encodeURIComponent(username) +'/';
    return this.http.get<any>(this.domain + 'application/allUserApplications/'+this.route+language);
  }
  // Function to edit/update theme post
  public editApplication(application) {
    return this.http.put<any>(this.domain + 'application/editApplication',application);
  }
}