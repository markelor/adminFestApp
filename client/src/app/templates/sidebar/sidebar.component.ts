import { Component, OnInit } from '@angular/core';
//import { ThemeService } from '../../services/theme.service';
import { LocalizeRouterService } from 'localize-router';
import { TranslateService } from '@ngx-translate/core';
import { ObservableService} from '../../services/observable.service';
import { Router,NavigationEnd } from '@angular/router';
import { SpacePipe } from '../../shared/pipes/space.pipe'
import 'assets/scripts/common.js'
declare var sidebarObj: any;
declare let $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  private archeologyItems;
  private symbologyItems;
  private translateThematic;
  private translateTheme;
  private translateClass;
  private translateId;
  private subscription;
  constructor(
    private localizeService:LocalizeRouterService,
    private router:Router,
    //private themeService:ThemeService,
    private translate:TranslateService,
    private observableService:ObservableService,
    private spacePipe:SpacePipe
  ) { 
    this.subscription=router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        event.url=decodeURIComponent(event.url);
        //Get thematic
        if(event.url.split('/')[3]){
          this.translateThematic=event.url.split('/')[2];
          this.translateTheme=event.url.split('/')[3];
          this.translateClass=undefined;
        }
        if(event.url.split('/')[4]){
          this.translate.get('details-route').subscribe(data => {
            if(data===event.url.split('/')[4]){
              this.translateClass=undefined;   
              this.translateId=event.url.split('/')[5];
            }else{
              this.translateClass=event.url.split('/')[4];
              this.translateId=undefined;
            }
          }); 
        }
        if(event.url.split('/')[6]){
          this.translate.get('details-route').subscribe(data => {
            if(data===event.url.split('/')[5]){
              this.translateClass=event.url.split('/')[4];   
              this.translateId=event.url.split('/')[6];
            }
          }); 
        }
      }
    });
  }
  private saveRouteTranslate(themeIndexTranslate,classIndexTranslate,thematicTranslate,allTranslate,idTranslate){
   //Save theme and class to translate
    this.observableService.thematicTranslate=thematicTranslate;
    this.observableService.themeIndexTranslate=themeIndexTranslate;
    this.observableService.classIndexTranslate=classIndexTranslate;
    this.observableService.allTranslate=allTranslate;
    this.observableService.idTranslate=idTranslate;
  }
  private translateArcheologyThemes(){
    //To translte all when load in first time
    this.translate.get('all-route').subscribe(
    data => {
      if(data===this.translateTheme && !this.translateId){
        this.saveRouteTranslate(undefined,undefined,"archeology","all",undefined);
      }else if(data===this.translateClass){
        for (var i = 0; i < this.archeologyItems.length; i++) {
          if(this.spacePipe.transform(this.archeologyItems[i].theme.toLowerCase()," ")==this.translateTheme){
            this.saveRouteTranslate(i,undefined,"archeology","all",undefined);
          }
        }
      }
    });  
    //To translte archeology when load in first time
    this.translate.get('archeology-route').subscribe(
    data => {
      if(data===this.translateThematic && !this.translateId){
         for (var i = 0; i < this.archeologyItems.length; i++) {
          if(this.translateClass){
            if(this.spacePipe.transform(this.archeologyItems[i].theme.toLowerCase()," ")==this.translateTheme){
              for (var j = 0; j < this.archeologyItems[i].classes.length; j++) {
                if(this.spacePipe.transform(this.archeologyItems[i].classes[j].class.toLowerCase()," ")==this.translateClass){
                  this.saveRouteTranslate(i,j,"archeology",undefined,undefined);
                }
              }
            }
          }else{
            if(this.spacePipe.transform(this.archeologyItems[i].theme.toLowerCase()," ")==this.translateTheme){
              this.saveRouteTranslate(i,undefined,"archeology",undefined,undefined);
            }         
          }
        }
      }
    }); 
    //To translte when load map in first time
    this.translate.get('map-route').subscribe(
    data => {
      if(data===this.translateThematic && !this.translateId){
         for (var i = 0; i < this.archeologyItems.length; i++) {
          if(this.translateClass){
            if(this.spacePipe.transform(this.archeologyItems[i].theme.toLowerCase()," ")==this.translateTheme){
              for (var j = 0; j < this.archeologyItems[i].classes.length; j++) {
                if(this.spacePipe.transform(this.archeologyItems[i].classes[j].class.toLowerCase()," ")==this.translateClass){
                  this.saveRouteTranslate(i,j,"archeology",undefined,undefined);
                }
              }
            }
          }else{
            if(this.spacePipe.transform(this.archeologyItems[i].theme.toLowerCase()," ")==this.translateTheme){
              this.saveRouteTranslate(i,undefined,"archeology",undefined,undefined);
            }         
          }
        }
      }
    });   
  }
   private translateSymbologyThemes(){
     //To translte all when load in first time
    this.translate.get('all-route').subscribe(
    data => {
      if(data===this.translateTheme && !this.translateId){
        this.saveRouteTranslate(undefined,undefined,"symbology","all",undefined);
      }else if(data===this.translateClass){
        for (var i = 0; i < this.symbologyItems.length; i++) {
          if(this.spacePipe.transform(this.symbologyItems[i].theme.toLowerCase()," ")==this.translateTheme){
            this.saveRouteTranslate(i,undefined,"symbology","all",undefined);
          }
        }
      }
    });
    //To translte symbology when load in first time
    this.translate.get('symbology-route').subscribe(
    data => {       
      if(data===this.translateThematic && !this.translateId){
        for (var i = 0; i < this.symbologyItems.length; i++) {
          if(this.translateClass){
            if(this.spacePipe.transform(this.symbologyItems[i].theme.toLowerCase()," ")==this.translateTheme){
              for (var j = 0; j < this.symbologyItems[i].classes.length; j++) {         
                if(this.spacePipe.transform(this.symbologyItems[i].classes[j].class.toLowerCase()," ")==this.translateClass){
                  this.saveRouteTranslate(i,j,"symbology",undefined,undefined);
                }
              }
            }

          }else{
            if(this.spacePipe.transform(this.symbologyItems[i].theme.toLowerCase()," ")==this.translateTheme){
              this.saveRouteTranslate(i,undefined,"symbology",undefined,undefined);
            }         
          }
        }  
      }
    }); 
   }

  private getArcheologyThemes(lang) {
    //Dynamic archeology
    /*this.themeService.getArcheologyThemesJson(lang).subscribe(themesArcheology => {
      this.archeologyItems=themesArcheology;
      this.translateArcheologyThemes();
          
    });*/
  }
  private getSymbologyThemes(lang) {
    //Dynamic symbology  
    /*this.themeService.getSymbologyThemesJson(lang).subscribe(themesSymbology => {
      this.symbologyItems=themesSymbology;
      this.translateSymbologyThemes()
      setTimeout(() => {
        $( ".dropdown-toggle").unbind("click");
        sidebarObj.secondLevel();
    }, 1000);
    });  */
  }

  ngOnInit() {
    sidebarObj.init();
    sidebarObj.secondLevel();
    this.getArcheologyThemes(this.localizeService.parser.currentLang);
    this.getSymbologyThemes(this.localizeService.parser.currentLang);
    this.translate.onLangChange.subscribe(event => {
      // get archeology themes from JSON
      this.getArcheologyThemes(event.lang);
      // get simbology themes from JSON
      this.getSymbologyThemes(event.lang);

    });


   } 

}
