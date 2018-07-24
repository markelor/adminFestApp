import { Component,OnInit,OnDestroy,ViewChild} from '@angular/core';
import { EventService } from '../../../services/event.service';
import { LocalizeRouterService } from 'localize-router';
import { TranslateService } from '@ngx-translate/core';
import { ObservableService } from '../../../services/observable.service';
import { Subscription } from 'rxjs/Subscription';
import { BindContentPipe } from '../../../shared/pipes/bind-content.pipe';
@Component({
  selector: 'event-form-map',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit{
  private lat: number = 42.88305555555556;
  private lng: number = -1.9355555555555555;
  private zoom: number = 8;
  private coordinates;
  private markers: marker[]=[];
  private subscription:Subscription;
  constructor(
    private localizeService:LocalizeRouterService,
    private eventService:EventService,
    private translate:TranslateService,
    private observableService:ObservableService,
    private bindPipe: BindContentPipe
    ) {    
  }
  private clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  private placeClick($event){
    this.observableService.mapClickType="map-click-place";
    this.observableService.notifyOther({option: this.observableService.mapClickType,lat:$event.coords.lat,lng:$event.coords.lng});
  }
  private addMarker(data){
    console.log(data);
    this.lat=Number(data.lat);
    this.lng=Number(data.lng);
    //this.map._mapsWrapper.setCenter({lat: this.lat, lng: this.lng}));
    this.markers.push({      
      lat: Number(data.lat),
      lng: Number(data.lng),
      customInfo: data.icon,
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

  ngOnInit() {
    this.observableService.mapType="event-form-coordinates";
    this.subscription=this.observableService.notifyObservable.subscribe(res => {
      if (res.hasOwnProperty('option') && res.option === this.observableService.mapType) {
        this.markers=[];
        this.addMarker(res.value);
      }
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
  icon?:object;
  customInfo:string;
	labelOptions?: object;
	draggable: boolean;
}

