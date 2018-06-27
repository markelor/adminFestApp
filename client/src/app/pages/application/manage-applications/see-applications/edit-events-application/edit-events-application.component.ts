import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../services/auth.service';
import {ApplicationService } from '../../../../../services/application.service';
import { TranslateService } from '@ngx-translate/core';
import { LocalizeRouterService } from 'localize-router';
import { AuthGuard} from '../../../../guards/auth.guard';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit-events-application',
  templateUrl: './edit-events-application.component.html',
  styleUrls: ['./edit-events-application.component.css']
})
export class EditEventsApplicationComponent implements OnInit {
  private applicationId;
  constructor(
  	private authService:AuthService,
    private applicationService:ApplicationService,
    private localizeService:LocalizeRouterService,
    private translate:TranslateService,
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private authGuard:AuthGuard
    ) { }

  ngOnInit() {
  	// Get authentication on page load
    this.authService.getAuthentication(this.localizeService.parser.currentLang).subscribe(authentication => {
      if(!authentication.success){
        this.authService.logout();
        this.authGuard.redirectUrl=this.router.url;
        this.router.navigate([this.localizeService.translateRoute('/sign-in-route')]); // Return error and route to login page
      }
    });
    // Get application id
    this.applicationId=this.activatedRoute.snapshot.params['id'];
  }

}
