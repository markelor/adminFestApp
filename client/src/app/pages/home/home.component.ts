import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { TranslateService,LangChangeEvent } from '@ngx-translate/core';
import { LocalizeRouterService } from 'localize-router';
import { AuthGuard} from '../guards/auth.guard';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment-timezone';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private subscriptionLanguage: Subscription;
  private events;
  private page :number = 1;
  constructor(
  	private eventService:EventService,
    private localizeService:LocalizeRouterService,
    private translate:TranslateService,
    private router:Router,
    private authGuard:AuthGuard
  ) {
  }
  // Function to get all user events from the database
  private getEvents() {
    this.eventService.getEvents(this.localizeService.parser.currentLang).subscribe(data => {
      if(data.success){
        this.events = data.events; // Assign array to use in HTML
              console.log(data);
      }
    });
  }
  private getDatePoster(datetime){
    moment.updateLocale('eu', {
      calendar : {lastDay : '[Atzo]' , sameDay : '[Gaur]' , nextDay : '[Bihar]' , lastWeek : '[last] dddd [at] LT' , nextWeek : 'dddd [at] LT' , sameElse : 'L'}
    });
    moment.updateLocale('es', {
      calendar : {lastDay : '[Ayer]' , sameDay : '[Hoy]' , nextDay : '[Mañana]' , lastWeek : '[last] dddd [at] LT' , nextWeek : 'dddd [at] LT' , sameElse : 'L'}
    });
    var date=new Date(datetime);
    var now=new Date();
    var daysDiff=moment(date).tz("Europe/Madrid").diff(moment(now),'days');
    var monthName=moment(date).locale(this.localizeService.parser.currentLang).tz("Europe/Madrid").format('MMM');
    var dayName;
    if(daysDiff==0||daysDiff==1){
      dayName=moment(date).locale(this.localizeService.parser.currentLang).tz("Europe/Madrid").calendar();
    }else{
      dayName=moment(date).locale(this.localizeService.parser.currentLang).tz("Europe/Madrid").format('dddd');
    }
    var result=
                {
                  "month":monthName[0].toUpperCase() + monthName.substring(1),
                  "day":dayName[0].toUpperCase() + dayName.substring(1),
                  "dayNumber":moment(date).tz("Europe/Madrid").format('DD'),
                  "hour":moment(date).tz("Europe/Madrid").format('HH:mm'),
                };
    return result;
  }
  private getCommentators(comments){
    var commentator=[];
    var response ='';
    var j=0;
    for (var i = comments.length - 1; i >= 0; i--) {
      if(commentator.indexOf(comments[i].createdBy)<0){
        commentator.push(comments[i].createdBy);
        if(j!=0){
          response+='\n';
        }
        response+=comments[i].createdBy;
        j++;
      }
    }
    return response;
  }

  private getReactioners(reactions,amount){
    var reactioner=[];
    var response ='';
    var j=0;
    if(amount==1){
      for (var i = reactions.length - 1; i >= 0; i--) {
        if(reactioner.indexOf(reactions[i])<0){
          reactioner.push(reactions[i]);
          if(j!=0){
            response+='\n';
          }
          response+=reactions[i];
          j++;
        }
      }
    }else{
      var reaction;
      for(var k=0;k<amount;k++){
        if(k==0){reaction=reactions.likeBy}
        else if(k==1){reaction=reactions.loveBy}
        else if(k==2){reaction=reactions.hahaBy}
        else if(k==3){reaction=reactions.wowBy}
        else if(k==4){reaction=reactions.angryBy}
        else if(k==5){reaction=reactions.sadBy}
        for (var i = reaction.length - 1; i >= 0; i--) {
          if(reactioner.indexOf(reaction[i])<0){
            reactioner.push(reaction[i]);
            if(j!=0){
              response+='\n';
            }
            response+=reaction[i];
            j++;
          }
        }
      }
    }
    return response;
  }
  ngOnInit() {
    moment.locale(this.localizeService.parser.currentLang);
  	this.getEvents();
    this.subscriptionLanguage =this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.localizeService.parser.currentLang=event.lang;
      this.getEvents(); 
    });
  }
  ngOnDestroy(){
      this.subscriptionLanguage.unsubscribe();
  } 

}

