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


  // Function to create a new event post
  public newEvent(event,place) {
    var data = {'event': event, 'place': place };
    return this.http.post<any>(this.domain + 'event/newEvent', data);
  }
  // Function to get all user events from the database
  public getUserEvents(username,language) {
    this.route= encodeURIComponent(username) +'/';
    return this.http.get<any>(this.domain + 'event/userEvents/'+this.route+language);
  }
  // Function to get events from the database
  public getEvents(language) {
    return this.http.get<any>(this.domain + 'event/getEvents/'+language);
  }
  // Function to get all user events from the database
  public getEvent(id,language) {
    this.route= encodeURIComponent(id) +'/';
    return this.http.get<any>(this.domain + 'event/getEvent/'+this.route+language);
  }
  // Function to edit/update theme post
  public editEvent(event,place) {
    var data = {'event': event, 'place': place };
    console.log(data);
    return this.http.put<any>(this.domain + 'event/editEvent', data);
  }
  public eventSearch(searchs: Observable<string>,language) {
    return searchs.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(search => this.getEventsSearch(search,language));
  }
   // Function to get all themes from the database
  public getEventsSearch(search,language) {
    if(!search){
      this.route='';
    }else{
      this.route= encodeURIComponent(search) +'/';
    }    
    return this.http.get<any>(this.domain + 'event/eventsSearch/'+this.route+language);
  }
  // Function to get all archeology themes from the database
  public getAllThemesThematic(thematic,visible,language) {
    this.route= encodeURIComponent(thematic) +'/'+visible +'/';
    return this.http.get<any>(this.domain + 'event/allThemesThematic/'+this.route+language);
  }
  // Function to get all archeology themes find by theme.
  public getAllThemesTheme(thematic,theme,language) {
    this.route= encodeURIComponent(thematic) +'/'+theme +'/';
    return this.http.get<any>(this.domain + 'event/allThemesTheme/'+this.route+language);
  }
  // Function to get all archeology themes find by class.
  public getAllThemesClass(thematic,theme,themeClass,language) {
    this.route= encodeURIComponent(thematic) +'/'+encodeURIComponent(theme)+'/'+encodeURIComponent(themeClass)+'/';
    return this.http.get<any>(this.domain + 'event/allThemesClass/'+this.route+language);
  }
  // Function to get all archeology themes find by class.
  public getAllThemesRegion(country,region,language) {
    this.route= encodeURIComponent(country) +'/'+encodeURIComponent(region) +'/';
    return this.http.get<any>(this.domain + 'event/allThemesRegion/'+this.route+language);
  }
  // Function to get the theme using the id
  public getSingleTheme(id,language) {
    this.route= id +'/'
    return this.http.get<any>(this.domain + 'event/singleTheme/'+this.route+language);
  }

  // Function to delete a theme
  public deleteTheme(id,language) {
    this.route= id +'/'
    return this.http.delete<any>(this.domain + 'event/deleteTheme/' +this.route+language);
  }

  // Function to like a theme post
  public addReactionTheme(id,reaction,language) {
    const themeData = { id: id,reaction:reaction,language:language };
    return this.http.put<any>(this.domain + 'event/addReactionTheme', themeData);
  }

  // Function to dislike a theme post
  public deleteReactionTheme(id,language) {
    const themeData = { id: id,language:language };
    return this.http.put<any>(this.domain + 'event/deleteReactionTheme',themeData);
  }

  // Function to post a comment on a theme post
  public postComment(id, comment) {
    // Create themeData to pass to backend
    const themeData = {
      id: id,
      comment: comment
    }
    return this.http.post<any>(this.domain + 'event/comment', themeData);

  }
  public getArcheologyThemesJson(language){
    return this.http.get<any>('assets/json/archeology/event/'+language+'.json'); 
  }
  public getSymbologyThemesJson(language){
    return this.http.get<any>('assets/json/symbology/event/'+language+'.json'); 
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