import { Component, OnInit,ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { LocalizeRouterService } from 'localize-router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
   
  constructor(private authService:AuthService,private localizeService:LocalizeRouterService) {
	    
  }

  ngOnInit() {

  }

}
