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
  private title: string = 'Titulua';
  private lat: number = 42.88305555555556;
  private lng: number = -1.9355555555555555;
  private zoom: number = 9;
  private markers: marker[]=[];
  private events;
  private subscription:Subscription;
  constructor(private localizeService:LocalizeRouterService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private eventService:EventService,
    private translate:TranslateService,
    private bindPipe: BindContentPipe) { 
    
  }
  private clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  private handleSVG(svg: SVGElement, parent: Element | null): SVGElement {
    svg.setAttribute('width', '80');
    svg.setAttribute('height', '80');
    return svg;
  }
  private onSvgInserted(event,m){
    var icon={
      url:"data:image/svg+xml;utf-8,"+this.bindPipe.transform(event,undefined,undefined).changingThisBreaksApplicationSecurity.outerHTML,
      scaledSize: {
        height: 40,
        width: 40
      }
    }
    m.icon=icon;
  }
  private addMarker(data){
    console.log(data);
    this.lat=Number(data.place.coordinates.lat);
    this.lng=Number(data.place.coordinates.lng);
    //this.map._mapsWrapper.setCenter({lat: this.lat, lng: this.lng}));
    this.markers.push({      
      lat: Number(data.place.coordinates.lat),
      lng: Number(data.place.coordinates.lng),
      customInfo: data.categories[0].icons[0].url,
      /*labelOptions: {
        color: '#CC0000',
        fontFamily: '',
        fontSize: '14px',
        fontWeight: 'bold',
        text: data.title
       },*/
      draggable: true
    });
  }
    // Function to get all user events from the database
  private getEvents() {
    this.eventService.getEvents(this.localizeService.parser.currentLang).subscribe(data => {
      if(data.success){
        this.events = data.events; // Assign array to use in HTML
        this.markers=[];
        for (var i = 0; i < this.events.length; ++i) {    
          this.addMarker(this.events[i]);
        }
      }
    });
  }
  ngOnInit() {
    this.getEvents();
    /*this.observableService.mapType="event-form-coordinates";
    this.subscription=this.observableService.notifyObservable.subscribe(res => {
      if (res.hasOwnProperty('option') && res.option === this.observableService.mapType) {
        this.markers=[];
        this.addMarker(res.value);
      }
    }); */   
  }

}
// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  icon?:object;
  customInfo:string;
  labelOptions?: object;
  draggable: boolean;
}

