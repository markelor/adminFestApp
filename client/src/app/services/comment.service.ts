import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { LocalizeRouterService } from 'localize-router';
@Injectable()
export class CommentService {
  private domain = this.authService.domain;
  private route;
  private language;
  constructor(
    private authService: AuthService,
    private localizeService:LocalizeRouterService,
    private http: HttpClient
  ) { }


  // Function to create a new comment post
  public newComment(comment) {
    return this.http.post<any>(this.domain + 'comment/newComment', comment);
  }
   // Function to get ccategories from the database
  public getComments(language) {
    this.language=language;
    return this.http.get<any>(this.domain + 'comment/getComments/'+language);
  }
  // Function to edit a comment
  public editComment(comment) {
    return this.http.put<any>(this.domain + 'comment/editComment',comment);
  }
  // Function to delete a comment
  public deleteComment(username,id,language) {
    this.route= username+'/'+id +'/';
    return this.http.delete<any>(this.domain + 'comment/deleteComment/' + this.route+language);
  }
}