import { Component,OnDestroy } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { LocalizeRouterService } from 'localize-router';
import { TranslateService } from '@ngx-translate/core';
import { BindContentPipe } from '../../../shared/pipes/bind-content.pipe';
import { ActivatedRoute,Router,NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'map-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent  {
  private language:string;	
  private title: string = 'My first AGM project';
  private lat: number = 51.678418;
  private lng: number = 7.809007;
  private zoom: number = 2;
  private markers: marker[]=[];
  private events;
  private eventRoute:string;
  private classRoute:string;
  private subscription:Subscription;
  constructor(private localizeService:LocalizeRouterService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private eventService:EventService,
    private translate:TranslateService,
    private bindPipe: BindContentPipe) { 
    this.subscription=router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        //Get thematic
      this.translate.get('map-route').subscribe(
      data => {
        if(event.url.split('/')[2]===data){
          this.init();
        }

      });     
      }
    });
  }
  private clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  private addMarker(i,icon){
    this.markers.push({      
      lat: Number(this.events[i].coordinates.lat),
      lng: Number(this.events[i].coordinates.lng),
      icon:"assets/img/icons/"+icon+".svg",
      labelOptions: {
        /*color: '#CC0000',
        fontFamily: '',
        fontSize: '14px',
        fontWeight: 'bold',*/
        //text: this.bindPipe.transform(this.events[i],this.language,'title',undefined),
       },
      draggable: true
    });

  }
  /*private organizedEvents(events){
    this.events = events; // Assign array to use in HTML
    for (var i = 0; i < this.events.length; i++) {  
      //Get class
      if (this.bindPipe.transform(this.events[i],this.language,'class',undefined)){
        this.translate.get('map-icon.'+this.bindPipe.transform(this.events[i],this.language,'class',undefined)).subscribe(
        data => {
          this.addMarker(i,data);
        });  

      }else{
        this.translate.get('map-icon.'+this.bindPipe.transform(this.events[i],this.language,'event',undefined)).subscribe(
        data => {
          this.addMarker(i,data);
        });  
      }
    } 
  }
  */

 /* private getAllEventsThematic(thematic) {
    // Function to GET all events from database
    this.eventService.getAllEventsThematic(thematic,true,this.language).subscribe(data => {
    	if(data.success){
    		this.organizedEvents(data.events);     	
    	}
    });
  }

  private getAllEventsClass(thematic,event,eventClass) {
    // Function to GET all events from database by class
    this.eventService.getAllEventsClass(thematic,event,eventClass,this.language).subscribe(data => {
      if(data.success){
        this.organizedEvents(data.events);      
      }
    });
  }
  
  private getAllEventsEvent(thematic,event) {
    // Function to GET all events from database by event
    this.eventService.getAllEventsEvent(thematic,event,this.language).subscribe(data => {
      if(data.success){
        this.organizedEvents(data.events);          
      }
    });
  }*/

  private init() {
    this.markers=[];
    this.eventRoute=this.activatedRoute.snapshot.params['event']; 
    this.classRoute=this.activatedRoute.snapshot.params['class'];
  	this.language=this.localizeService.parser.currentLang;
    //Get thematic
      this.translate.get('all-route').subscribe(
      all => {
      //Get thematic
        this.translate.get('create-event.thematic-archeology').subscribe(
        thematic => { 
          /*if(this.classRoute){
            if(all===this.classRoute){
              this.getAllEventsEvent(thematic,this.eventRoute);
            }else{
              this.getAllEventsClass(thematic,this.eventRoute,this.classRoute);
            } 
          }else if(this.eventRoute){
            if(all===this.eventRoute){
            this.getAllEventsThematic(thematic);
            }else{
              this.getAllEventsEvent(thematic,this.eventRoute);
            }
          }  */                  
        });  
      });  	
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }	

}
// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
  icon:string;
	labelOptions?: object;
	draggable: boolean;
}

