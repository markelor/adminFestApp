
import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { LocalizeRouterService } from 'localize-router';
import { ActivatedRoute,Router,NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  private themePosts:object;
  private language:string;
  private title:string;
  private subscription;

  constructor(private localizeService:LocalizeRouterService,private activatedRoute: ActivatedRoute,private router: Router, private translate:TranslateService) {
    this.subscription=router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        //Get thematic    
        if(event.url.split('/')[1]===localizeService.parser.currentLang||event.url==='/'){
        	console.log("hemen");
          this.init();
        }  
      }
    });
  }
  // Function to get all themes from the database
  private getAllThemes() {
    // Function to GET all themes from database
    /*this.themeService.getAllThemes(this.language).subscribe(data => {
      if(data.success){
        this.themePosts = data.themes; // Assign array to use in HTML 
      }
    });*/
  }
  private getThematicRoute(theme){
    if(eval('theme.languages.'+this.language+'[0].thematic')){
    }
  }

  private init() {
  	this.language=this.localizeService.parser.currentLang;
    this.themePosts=[];
  	this.getAllThemes();

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }  
}





