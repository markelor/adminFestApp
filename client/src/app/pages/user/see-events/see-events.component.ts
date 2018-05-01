import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { EventService } from '../../../services/event.service';
import { TranslateService } from '@ngx-translate/core';
import { LocalizeRouterService } from 'localize-router';
import { AuthGuard} from '../../guards/auth.guard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-see-events',
  templateUrl: './see-events.component.html',
  styleUrls: ['./see-events.component.css']
})
export class SeeEventsComponent implements OnInit {
  private events;

  constructor(
  	private eventService:EventService,
  	private authService:AuthService,
    private localizeService:LocalizeRouterService,
    private translate:TranslateService,
    private router:Router,
    private authGuard:AuthGuard
  ) {
  }
  // Function to get all themes from the database
  private getAllUserEvents() {
    // Function to GET all themes from database
    this.eventService.getAllUserEvents(this.authService.user.username,this.localizeService.parser.currentLang).subscribe(data => {
      console.log(data);
      if(data.success){
        this.events = data.events; // Assign array to use in HTML
        
      }
    });
  }
  ngOnInit() {
  		// Get authentication on page load
    this.authService.getAuthentication(this.localizeService.parser.currentLang).subscribe(authentication => {
      if(!authentication.success){
        this.authService.logout();
        this.authGuard.redirectUrl=this.router.url;
        this.router.navigate([this.localizeService.translateRoute('/sign-in-route')]); // Return error and route to login page
      }
    });
  	this.getAllUserEvents();
  } 
}
