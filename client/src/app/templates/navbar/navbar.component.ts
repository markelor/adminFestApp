import { Component, OnInit } from '@angular/core';
import { LocalizeRouterService } from 'localize-router';
import { AuthService } from '../../services/auth.service';
//import { ThemeService } from '../../services/theme.service';
import { Subject } from 'rxjs/Subject';
import { ActivatedRoute,Router,NavigationEnd } from '@angular/router';
import { ObservableService} from '../../services/observable.service';
import { SpacePipe } from '../../shared/pipes/space.pipe'
import { TranslateService } from '@ngx-translate/core';
declare let $: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	private lag:string;
	private language:string;
	private selected:number;
  private avatar:string;
  private search:boolean;
  private themesSearch;
  private searchTerm = new Subject<string>();
  private screen:boolean;
  constructor(
    private localizeService: LocalizeRouterService,
    private translate:TranslateService,
    private activatedRoute:ActivatedRoute,
    private authService:AuthService,
    private router:Router,
    //private themeService:ThemeService,
    private observableService:ObservableService,
    private spacePipe:SpacePipe) {
	this.changeLanguage(this.localizeService.parser.currentLang);
  }
   /*private deleteObservable(){
   //Save theme and class to translate
    this.observableService.themeIndexTranslate=undefined;
    this.observableService.classIndexTranslate=undefined;
    this.observableService.allTranslate=undefined;
    this.observableService.idTranslate=undefined;
    this.observableService.staticRegionTranslate=undefined;
    this.observableService.regionIndexTranslate=undefined;
  }*/
  public translateRoutes(lang){
    var allParam
       if(lang==='es'){
        allParam='todos';
      }else if(lang==="eu"){
        allParam='denak';
      } else if(lang==='en'){
        allParam='all';
      }
    /*if(this.observableService.thematicTranslate==="archeology"){
      if(this.observableService.allTranslate==="all"){ 
        if(this.observableService.themeIndexTranslate>=0){
          //Get themes on page load
          this.themeService.getArcheologyThemesJson(lang).subscribe(themesArcheology => {
            this.localizeService.changeLanguage(lang,this.spacePipe.transform(themesArcheology[this.observableService.themeIndexTranslate].theme.toLowerCase()," "),allParam);  
          }); 
        }else{
          this.localizeService.changeLanguage(lang,allParam,undefined);  
        }        
      }else{
        //Get themes on page load
        this.themeService.getArcheologyThemesJson(lang).subscribe(themesArcheology => {
          if(this.observableService.classIndexTranslate>=0){
            if(this.observableService.idTranslate){
              //translate id
            }else{
              this.localizeService.changeLanguage(lang,this.spacePipe.transform(themesArcheology[this.observableService.themeIndexTranslate].theme.toLowerCase()," "),this.spacePipe.transform(themesArcheology[this.observableService.themeIndexTranslate].classes[this.observableService.classIndexTranslate].class.toLowerCase()," "));
            }
            
          }else{ 
            if(this.observableService.idTranslate){
              //translate id
            }else{
              this.localizeService.changeLanguage(lang,this.spacePipe.transform(themesArcheology[this.observableService.themeIndexTranslate].theme.toLowerCase()," "),undefined);
            }
            
          }
        }); 
      }           
    }else if(this.observableService.thematicTranslate==="symbology"){
      if(this.observableService.allTranslate==="all"){ 
        if(this.observableService.themeIndexTranslate>=0){
          //Get themes on page load
          this.themeService.getSymbologyThemesJson(lang).subscribe(themesSymbology => {
            this.localizeService.changeLanguage(lang,this.spacePipe.transform(themesSymbology[this.observableService.themeIndexTranslate].theme.toLowerCase()," "),allParam);  
          }); 
        }else{
          this.localizeService.changeLanguage(lang,allParam,undefined);  
        }        
      }else{
        //Get themes on page load
        this.themeService.getSymbologyThemesJson(lang).subscribe(themesSymbology => {
          if(this.observableService.classIndexTranslate>=0){
            this.localizeService.changeLanguage(lang,this.spacePipe.transform(themesSymbology[this.observableService.themeIndexTranslate].theme.toLowerCase()," "),this.spacePipe.transform(themesSymbology[this.observableService.themeIndexTranslate].classes[this.observableService.classIndexTranslate].class.toLowerCase()," "));
          }else{ 
            this.localizeService.changeLanguage(lang,themesSymbology[this.observableService.themeIndexTranslate].theme.toLowerCase(),undefined);
          }
        }); 
      }
       
    }else if(this.observableService.thematicTranslate==="region"){
      //Get themes on page load
      this.themeService.getArcheologyGeonamesJson(this.observableService.regionIndexTranslate,lang).subscribe(region => {
        this.localizeService.changeLanguage(lang,region.geonames[0].countryName.split('-').join('_').split(' ').join('-').toLowerCase(),region.geonames[0].adminName1.split('-').join('_').split(' ').join('-').toLowerCase());
      });       
    }else{
      this.localizeService.changeLanguage(lang,undefined,undefined);
    }*/
    this.localizeService.changeLanguage(lang,undefined,undefined);
  }
  public changeLanguage(lang) { 
    this.translateRoutes(lang);  
	  this.selectedLanguage(lang);
  }
  private selectedLanguage(lang){
  	this.lag=lang;
  	this.language=lang.charAt(0).toUpperCase() + lang.slice(1)  	
  }
  private msg:string;
  
  private onClickOutside() {
    if(this.search){
      $('.ks-search-close').click();
      this.search=false;
    }
  }
  private logout(){
    this.authService.logout();
    this.router.navigate([this.localizeService.translateRoute('/sign-in-route')]);
  }

  ngOnInit() {
    var that=this;
    $( window ).resize(function() {
      if($(window).width() >1225 && $(window).width()<=1500){
        that.screen=true
      } 
      else{
        that.screen=false;
      }
    });

  	this.authService.getProfile().subscribe(data=>{
      if(data.success){
        this.avatar=data.user.currentAvatar;
      }   
    });
    /*this.themeService.themeSearch(this.searchTerm,this.localizeService.parser.currentLang).subscribe(data=>{
      if(data.success){
        this.themesSearch=data.themes; 
        if(!$('.ks-search-form.nav-item.dropdown.show')[0]){
          $('.ks-search-form.nav-item.dropdown').addClass('show');
        }   
      }     
    });*/
  }

}
//ks-search-form nav-item dropdown
