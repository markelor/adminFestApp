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
              console.log(moment(this.events[0].start).tz("Europe/Madrid").format('MMM'));
      }
    });
  }
  private getDatePoster(datetime){
    var date=new Date(datetime);
    var monthName=moment(date).tz("Europe/Madrid").format('MMM');
    var dayName=moment(date).tz("Europe/Madrid").format('dd');
    var result=
                {
                  "month":monthName[0].toUpperCase() + monthName.substring(1),
                  "day":dayName[0].toUpperCase() + dayName.substring(1),
                  "dayNumber":moment(date).tz("Europe/Madrid").format('DD'),
                  "hour":moment(date).tz("Europe/Madrid").format('HH:mm'),
                };
    return result;
  }
  private getMonthShort(number){
    //number 0-11;
    
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

