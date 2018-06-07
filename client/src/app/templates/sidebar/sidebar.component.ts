import { Component, OnInit } from '@angular/core';
//import { ThemeService } from '../../services/theme.service';
import { AuthService } from '../../services/auth.service';
import { LocalizeRouterService } from 'localize-router';
import { TranslateService } from '@ngx-translate/core';
import 'assets/scripts/common.js'
declare var sidebarObj: any;
declare let $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  private permission;
 
  constructor(
    private authService:AuthService,
     private localizeService:LocalizeRouterService
  ) { 
  }

  private isAdmin() {
    this.authService.getPermission(this.localizeService.parser.currentLang).subscribe(data => {
      if(data.success){
        if(data.permission=="admin")
        this.permission = true; // Assign array to use in HTML
      }else{
        this.permission = false;
      }
    });
  }

  ngOnInit() {
    sidebarObj.init();
    sidebarObj.secondLevel();
    this.isAdmin();
  } 

}
