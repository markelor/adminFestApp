import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { LocalizeRouterService } from 'localize-router';
@Injectable()
export class CategoryService {
  private domain = this.authService.domain;
  private route;

  constructor(
    private authService: AuthService,
    private localizeService:LocalizeRouterService,
    private http: HttpClient
  ) { }


  // Function to create a new comment post
  public newCategory(category) {
    return this.http.post<any>(this.domain + 'category/newCategory', category);
  }
   // Function to get all categories from the database
  public getAllCategories(language) {
    return this.http.get<any>(this.domain + 'category/allCategories/'+language);
  }
   // Function to get all categories from the database
  public getAllChildCategories(id,language) {
    this.route=  encodeURIComponent(id)+'/';
    return this.http.get<any>(this.domain + 'category/allChildCategories/'+ this.route+language);
  }
  // Function to delete a category
  public deleteCategory(id,language) {
    this.route=  encodeURIComponent(id)+'/';
    return this.http.delete<any>(this.domain + 'category/delete/' + this.route+language);
  }
  // Function to edit a category
  public editCategory(category) {
    return this.http.put<any>(this.domain + 'category/updateCategory',category);
  }
}