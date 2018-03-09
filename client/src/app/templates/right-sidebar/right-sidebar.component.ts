import { Component, OnInit } from '@angular/core';
//import { ThemeService } from '../../services/theme.service';
import { TranslateService } from '@ngx-translate/core';
import { GroupByPipe } from '../../shared/pipes/group-by.pipe';
import { LocalizeRouterService } from 'localize-router';
import { Router,NavigationEnd } from '@angular/router';
import { ObservableService} from '../../services/observable.service';
@Component({
  selector: 'right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.css']
})
export class RightSidebarComponent implements OnInit {

  private locations:Array<any>=[];
  private country:Array<any>=[];
  private language:string;
  private subscription;
  private translateThematic;
  private translateCountry;
  private translateRegion;
  constructor(
    private localizeService:LocalizeRouterService,
    private router:Router,
    //private themeService:ThemeService,
    private translate:TranslateService,
    private observableService:ObservableService,
    private groupByPipe:GroupByPipe
  ) {
    this.subscription=router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        event.url=decodeURIComponent(event.url);
        //Get thematic
        this.translate.get('region-route').subscribe(
        data => {
          if(event.url.split('/')[2]===data){
            this.translateThematic=event.url.split('/')[2];
            this.translateCountry=event.url.split('/')[3];
            this.translateRegion=event.url.split('/')[4];
          }
        }); 
      }
    });
   }
  private saveRouteTranslate(regionIndexTranslate,thematicTranslate){   
    //Save theme and class to translate
    this.observableService.thematicTranslate=thematicTranslate;
    this.observableService.regionIndexTranslate=regionIndexTranslate;
  }
  private translateArcheologyThemes(){  
    //To translte archeology when load in first time
    this.translate.get('region-route').subscribe(
    data => {
      if(data===this.translateThematic){
         for (var i = 0; i < this.locations.length; i++) {
          if(this.locations[i].key.split('-').join('_').split(' ').join('-').toLowerCase()===this.translateCountry){
            for (var j = 0; j < this.locations[i].value.length; j++) {
              if(this.locations[i].value[j].region.split('-').join('_').split(' ').join('-').toLowerCase()===this.translateRegion){
                this.saveRouteTranslate(this.locations[i].value[j].regionGeonameId,"region");
              }
            }
          }
        }
      }
    }); 
  }
  private getAllThemesThematic(thematic) {
    this.locations=[];
    // Function to GET all themes from database
    /*this.themeService.getAllThemesThematic(thematic,true,this.language).subscribe(data => {
      if(data.success){
        let themeArcheology:Array<any>=[];
        for (var i = 0; i < data.themes.length; ++i) {
          themeArcheology.push(eval('data.themes['+i+'].languages.'+this.language+'[0].location'));
        }
        this.locations=this.groupByPipe.transform(themeArcheology,'country');
        this.translateArcheologyThemes();
      }	
    });*/
  }

  ngOnInit() {
  	this.language=this.localizeService.parser.currentLang;
  	//Get thematic
    this.translate.get('create-theme.thematic-archeology').subscribe(
    thematic => {
      this.getAllThemesThematic(thematic);
    });
    this.translate.onLangChange.subscribe(event => {
      this.language=event.lang;
      //Get thematic
      this.translate.get('create-theme.thematic-archeology').subscribe(
      thematic => {
        setTimeout(() => {
          this.getAllThemesThematic(thematic);
        }, 0);
        
      });
    });
  	
  }

}
