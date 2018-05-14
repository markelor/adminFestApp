import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { AplicationService } from '../../../../services/aplication.service';
import { TranslateService } from '@ngx-translate/core';
import { LocalizeRouterService } from 'localize-router';
import { AuthGuard} from '../../../guards/auth.guard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-see-aplications',
  templateUrl: './see-aplications.component.html',
  styleUrls: ['./see-aplications.component.css']
})
export class SeeAplicationsComponent implements OnInit {
  private aplications;
  constructor(
  	private aplicationService:AplicationService,
  	private authService:AuthService,
    private localizeService:LocalizeRouterService,
    private translate:TranslateService,
    private router:Router,
    private authGuard:AuthGuard
    ) { }

  // Function to get all user aplications from the database
  private getAllUserAplications() {
    this.aplicationService.getAllUserAplications(this.authService.user.username,this.localizeService.parser.currentLang).subscribe(data => {
      console.log(data);
      if(data.success){
        this.aplications = data.aplications; // Assign array to use in HTML
        console.log(this.aplications);
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
  	this.getAllUserAplications();
  } 

}
