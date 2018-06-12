import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { LocalizeRouterService } from 'localize-router';
@Injectable()
export class ServiceService {
  private domain = this.authService.domain;
  private route;

  constructor(
    private authService: AuthService,
    private localizeService:LocalizeRouterService,
    private http: HttpClient
  ) { }


  // Function to create a new comment post
  public newService(service) {
    return this.http.post<any>(this.domain + 'service/newService', service);
  }
   // Function to get ccategories from the database
  public getCategories(language) {
    return this.http.get<any>(this.domain + 'service/getCategories/'+language);
  }
   // Function to get ccategories from the database
  public getChildCategories(id,language) {
    this.route=  encodeURIComponent(id)+'/';
    return this.http.get<any>(this.domain + 'service/childCategories/'+ this.route+language);
  }
  // Function to delete a service
  public deleteService(id,language) {
    this.route=  encodeURIComponent(id)+'/';
    return this.http.delete<any>(this.domain + 'service/delete/' + this.route+language);
  }
  // Function to edit a service
  public editService(service) {
    return this.http.put<any>(this.domain + 'service/editService',service);
  }
}