import { Component,OnInit,OnDestroy,Input,ViewChild} from '@angular/core';
import { EventService } from '../../../services/event.service';
import { LocalizeRouterService } from 'localize-router';
import { TranslateService } from '@ngx-translate/core';
import { ObservableService } from '../../../services/observable.service';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'create-event-map',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit{
  private lat: number = 51.678418;
  private lng: number = 7.809007;
  private zoom: number = 8;
  private markers: marker[]=[];
  private subscription:Subscription;
  constructor(private localizeService:LocalizeRouterService,private eventService:EventService,private translate:TranslateService,private observableService:ObservableService) { 
    
  }
  private clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  private addMarker(data,icon){
    this.lat=Number(data.lat);
    this.lng=Number(data.lng);
    //this.map._mapsWrapper.setCenter({lat: this.lat, lng: this.lng}));
    this.markers.push({      
      lat: Number(data.lat),
      lng: Number(data.lng),
      icon:"assets/img/icons/"+icon+".svg",
      labelOptions: {
        /*color: '#CC0000',
        fontFamily: '',
        fontSize: '14px',
        fontWeight: 'bold',*/
        text: data.title,
       },
      draggable: true
    });
  }

  ngOnInit() {
    this.observableService.mapType="create-event-coordinates";
    this.subscription=this.observableService.notifyObservable.subscribe(res => {
      if (res.hasOwnProperty('option') && res.option === this.observableService.mapType) {
        this.markers=[];
        this.translate.get('map-icon.'+res.value.category).subscribe(data => {
          this.addMarker(res.value,data);
        });
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
  icon:string;
	labelOptions?: object;
	draggable: boolean;
}

