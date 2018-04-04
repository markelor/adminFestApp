import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { LocalizeRouterService } from 'localize-router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
@Injectable()
export class EventService {
  public domain = this.authService.domain;
  public route;

  constructor(
    private authService: AuthService,
    private localizeService:LocalizeRouterService,
    private http: HttpClient
  ) { }


  // Function to create a new theme post
  public newTheme(theme) {
    return this.http.post<any>(this.domain + 'themes/newTheme', theme);
  }
   // Function to get all themes from the database
  public getAllThemes(language) {
    return this.http.get<any>(this.domain + 'themes/allThemes/'+language);
  }
  public themeSearch(searchs: Observable<string>,language) {
    return searchs.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(search => this.getAllThemesSearch(search,language));
  }
   // Function to get all themes from the database
  public getAllThemesSearch(search,language) {
    if(!search){
      this.route='';
    }else{
      this.route= encodeURIComponent(search) +'/';
    }
    
    return this.http.get<any>(this.domain + 'themes/allThemesSearch/'+this.route+language);
  }
  // Function to get all archeology themes from the database
  public getAllThemesThematic(thematic,visible,language) {
    this.route= encodeURIComponent(thematic) +'/'+visible +'/';
    return this.http.get<any>(this.domain + 'themes/allThemesThematic/'+this.route+language);
  }
  // Function to get all archeology themes find by theme.
  public getAllThemesTheme(thematic,theme,language) {
    this.route= encodeURIComponent(thematic) +'/'+theme +'/';
    return this.http.get<any>(this.domain + 'themes/allThemesTheme/'+this.route+language);
  }
  // Function to get all archeology themes find by class.
  public getAllThemesClass(thematic,theme,themeClass,language) {
    this.route= encodeURIComponent(thematic) +'/'+encodeURIComponent(theme)+'/'+encodeURIComponent(themeClass)+'/';
    return this.http.get<any>(this.domain + 'themes/allThemesClass/'+this.route+language);
  }
  // Function to get all archeology themes find by class.
  public getAllThemesRegion(country,region,language) {
    this.route= encodeURIComponent(country) +'/'+encodeURIComponent(region) +'/';
    return this.http.get<any>(this.domain + 'themes/allThemesRegion/'+this.route+language);
  }
  // Function to get the theme using the id
  public getSingleTheme(id,language) {
    this.route= id +'/'
    return this.http.get<any>(this.domain + 'themes/singleTheme/'+this.route+language);
  }

  // Function to edit/update theme post
  public editTheme(theme) {
    return this.http.put<any>(this.domain + 'themes/updateTheme', theme);
  }
  // Function to delete a theme
  public deleteTheme(id,language) {
    this.route= id +'/'
    return this.http.delete<any>(this.domain + 'themes/deleteTheme/' +this.route+language);
  }

  // Function to like a theme post
  public addReactionTheme(id,reaction,language) {
    const themeData = { id: id,reaction:reaction,language:language };
    return this.http.put<any>(this.domain + 'themes/addReactionTheme', themeData);
  }

  // Function to dislike a theme post
  public deleteReactionTheme(id,language) {
    const themeData = { id: id,language:language };
    return this.http.put<any>(this.domain + 'themes/deleteReactionTheme',themeData);
  }

  // Function to post a comment on a theme post
  public postComment(id, comment) {
    // Create themeData to pass to backend
    const themeData = {
      id: id,
      comment: comment
    }
    return this.http.post<any>(this.domain + 'themes/comment', themeData);

  }
  public getArcheologyThemesJson(language){
    return this.http.get<any>('assets/json/archeology/themes/'+language+'.json'); 
  }
  public getSymbologyThemesJson(language){
    return this.http.get<any>('assets/json/symbology/themes/'+language+'.json'); 
  }
  public getArcheologyCulturalSecuenceJson(language){
    return this.http.get<any>('assets/json/archeology/culturalSecuence/'+language+'.json');
     
  }
  public getArcheologyContinentsJson(language){
    return this.http.get<any>('assets/json/archeology/continents/'+language+'.json');
     
  }
  public getEventGeonamesJson(geonameType,language,name){
    return this.http.get<any>('assets/json/'+geonameType+'/'+language+'/'+name+'.json');
     
  }
}