import { Component, OnInit } from '@angular/core';
import { LocalizeRouterService } from 'localize-router';
import { AuthService } from '../../services/auth.service';
//import { ThemeService } from '../../services/theme.service';
import { Subject } from 'rxjs/Subject';
import { ActivatedRoute,Router,NavigationEnd } from '@angular/router';
import { ObservableService} from '../../services/observable.service';
import { Subscription } from 'rxjs/Subscription';
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
  private subscription: Subscription;
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
    console.log('ROUTES', this.localizeService.parser.routes);
  }

  public translateRoutes(lang){
    this.localizeService.translateRoute(lang);
    this.localizeService.changeLanguage(lang);

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

  	this.authService.getAuthentication(this.localizeService.parser.currentLang).subscribe(data=>{
      if(data.success){
        this.avatar=data.user.currentAvatar;
      }  
    });
    //Change avatar
    this.observableService.avatarType="current-avatar";
      this.subscription=this.observableService.notifyObservable.subscribe(res => {    
        if (res.hasOwnProperty('option') && res.option === 'current-avatar') {
          if(res.data){  
              this.avatar=res.data;
            }
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