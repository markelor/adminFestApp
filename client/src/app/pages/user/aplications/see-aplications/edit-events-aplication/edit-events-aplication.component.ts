import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../services/auth.service';
import {AplicationService } from '../../../../../services/aplication.service';
import { TranslateService } from '@ngx-translate/core';
import { LocalizeRouterService } from 'localize-router';
import { AuthGuard} from '../../../../guards/auth.guard';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit-events-aplication',
  templateUrl: './edit-events-aplication.component.html',
  styleUrls: ['./edit-events-aplication.component.css']
})
export class EditEventsAplicationComponent implements OnInit {
  private aplication;
  private events;
  constructor(
  	private authService:AuthService,
    private aplicationService:AplicationService,
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
    // Get aplication
    this.aplicationService.getAplication(this.activatedRoute.snapshot.params['id'],this.authService.user.username,this.localizeService.parser.currentLang).subscribe(data => {
      if(data.success){
        this.aplication=data.aplication;
        this.events=data.events;
        console.log(this.aplication);
      }
    });
  }

}
