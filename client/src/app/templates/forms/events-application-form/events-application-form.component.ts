import { Component, OnInit,Injectable,Input,ViewChild } from '@angular/core';
import { LocalizeRouterService } from 'localize-router';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { ApplicationService } from '../../../services/application.service';
import { TranslateService } from '@ngx-translate/core';
import { Application } from '../../../class/application';
import { Subject } from 'rxjs/Subject';
import {DataTableDirective} from 'angular-datatables';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-events-application-form',
  templateUrl: './events-application-form.component.html',
  styleUrls: ['./events-application-form.component.css']
})
export class EventsApplicationFormComponent implements OnInit {
  private message;
  private messageClass;
  private subscriptionLanguage: Subscription;
  @Input() applicationId;
  private application;
  private eventsApplication;
  private events;
  @ViewChild(DataTableDirective)
  private dtElement: DataTableDirective;
  private dtOptions: any = {};
  private addTrigger: Subject<any> = new Subject();
  private deleteTrigger: Subject<any> = new Subject();
  constructor(
    private localizeService:LocalizeRouterService,
    private applicationService:ApplicationService,
    private authService:AuthService,
    private eventService:EventService,
    private translate: TranslateService,
    private router:Router){
    }

  private createSettings(){
    this.dtOptions = {
      // Declare the use of the extension in the dom parameter
      ordering: false,
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [
        /*'columnsToggle',*/
        'colvis',
        'copy',
        'print',
        'csv'
      ],
      scrollX: true,
      responsive: true,
      columnDefs: [
        { responsivePriority: 3, targets: 0 },
        { responsivePriority: 4, targets: 1 },
        { responsivePriority: 1, targets: 2 },
        { responsivePriority: 7, targets: 3 },
        { responsivePriority: 5, targets: 4 },
        { responsivePriority: 6, targets: 5 },
        { responsivePriority: 2, targets: 6 }
      ]
    };
  }
  private addEventApplicationTable(indexEvent){
    if(!this.application || !this.application.events.includes(this.events[indexEvent]._id)){
      this.application.events.push(this.events[indexEvent]._id);
      // Edit application
      this.applicationService.editApplication(this.application).subscribe(data => {
        if(data.success){ 
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            this.eventsApplication.push(this.events[indexEvent]);
            // Call the addTrigger to rerender again
            this.deleteTrigger.next();
          });
        }
      });
    }  
  }
  private deleteEventApplicationTable(indexEvent){
      var indexAplicatonEvent=this.application.events.indexOf(this.eventsApplication[indexEvent]._id);
      this.application.events.splice(indexAplicatonEvent,1);
      // Edit application
      this.applicationService.editApplication(this.application).subscribe(data => {
        if(data.success){ 
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            this.eventsApplication.splice(indexEvent,1);
            // Call the addTrigger to rerender again
            this.deleteTrigger.next();
          });
        }
      });
  }
  private getApplicationEvents(){
    // Get application
    this.applicationService.getApplication(this.applicationId,this.authService.user.username,this.localizeService.parser.currentLang).subscribe(data => {
      if(data.success){
        this.application=data.application;
        this.eventsApplication=data.events;
        this.deleteTrigger.next();
      }
    });
  }
  // Function to get events from the database
  private getEvents() {
    this.eventService.getEvents(this.localizeService.parser.currentLang).subscribe(data => {
      if(data.success){
        this.events=data.events;
        this.addTrigger.next();
      }
    });
  }
  ngOnInit() {
    $('textarea').each(function () {
      this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
    }).on('input', function () {
      this.style.height = (this.scrollHeight) + 'px';
    }); 
    this.createSettings(); 
    this.getApplicationEvents();
    this.getEvents();	  
    this.subscriptionLanguage =this.localizeService.routerEvents.subscribe((language: string) => {
      setTimeout(()=>{
        this.router.navigate([this.localizeService.translateRoute('/user-route')]); // Return error and route to login page
      },0);

    });      
  }
  ngOnDestroy(){
      this.subscriptionLanguage.unsubscribe();
  }
}
