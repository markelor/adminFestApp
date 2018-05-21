import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { ApplicationService } from '../../../../services/application.service';
import { TranslateService } from '@ngx-translate/core';
import { LocalizeRouterService } from 'localize-router';
import { AuthGuard} from '../../../guards/auth.guard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-see-applications',
  templateUrl: './see-applications.component.html',
  styleUrls: ['./see-applications.component.css']
})
export class SeeApplicationsComponent implements OnInit {
  private applications;
  constructor(
  	private applicationService:ApplicationService,
  	private authService:AuthService,
    private localizeService:LocalizeRouterService,
    private translate:TranslateService,
    private router:Router,
    private authGuard:AuthGuard
    ) { }

  // Function to get all user applications from the database
  private getUserApplications() {
    this.applicationService.getUserApplications(this.authService.user.username,this.localizeService.parser.currentLang).subscribe(data => {
      console.log(data);
      if(data.success){
        this.applications = data.applications; // Assign array to use in HTML
        console.log(this.applications);
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
  	this.getUserApplications();
  } 

}
