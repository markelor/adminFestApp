import { Component, OnInit } from '@angular/core';
//import { ThemeService } from '../../services/theme.service';
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

  constructor(
  ) { 
  }

  ngOnInit() {
    sidebarObj.init();
    sidebarObj.secondLevel();
  } 

}
