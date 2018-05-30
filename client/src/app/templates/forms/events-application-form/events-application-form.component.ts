import { Component, OnInit,Injectable,Input,ViewChild } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { LocalizeRouterService } from 'localize-router';
import { AuthService } from '../../../services/auth.service';
import { EventService } from '../../../services/event.service';
import { ApplicationService } from '../../../services/application.service';
import { TranslateService } from '@ngx-translate/core';
import { Application } from '../../../class/application';
import { Subject } from 'rxjs/Subject';
import {DataTableDirective} from 'angular-datatables';

@Component({
  selector: 'app-events-application-form',
  templateUrl: './events-application-form.component.html',
  styleUrls: ['./events-application-form.component.css']
})
export class EventsApplicationFormComponent implements OnInit {
  private message;
  private messageClass;
  private form:FormGroup;
  private event:AbstractControl;
  @Input() applicationId;
  private application;
  private eventsApplication;
  private placesApplication;
  private categoryApplication
  private events;
  @ViewChild(DataTableDirective)
  private dtElement: DataTableDirective;
  private dtOptions: any = {};
  private addTrigger: Subject<any> = new Subject();
  private deleteTrigger: Subject<any> = new Subject();
  private search:boolean=true;
  private eventsSearch;
  private searchTerm = new Subject<string>();
  constructor(
    private fb: FormBuilder,
    private localizeService:LocalizeRouterService,
    private applicationService:ApplicationService,
    private authService:AuthService,
    private eventService:EventService,
    private translate: TranslateService){
    this.createForm(); // Create new theme form on start up
    }
    // Function to create new theme form
  private createForm() {
    this.form = this.fb.group({
      event: [''],
    })
    this.event = this.form.controls['event'];
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
        'csv',

      ],
      responsive: true
    };
  }
  private addEventApplication(){
    var index=this.eventsSearch.map(event => event.title).indexOf(this.event.value);
    if(this.event.value && !this.application.events.includes(this.eventsSearch[index]._id) && this.eventsSearch.filter(event => event.title === this.event.value).length > 0){
      this.application.events.push(this.eventsSearch[index]._id);
      this.event.setValue("");
      // Edit application
      this.applicationService.editApplication(this.application).subscribe(data => {
        if(data.success){ 
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            this.eventsApplication.push(this.eventsSearch[index]);
            // Call the addTrigger to rerender again
            this.deleteTrigger.next();
          });
        }
      });
    }
  }
  private addEventApplicationTable(indexEvent){
    console.log(this.events[indexEvent]._id);
    console.log(this.application);
    if(!this.application || !this.application.events.includes(this.events[indexEvent]._id)){
      this.application.events.push(this.events[indexEvent]._id);
      // Edit application
      this.applicationService.editApplication(this.application).subscribe(data => {
        console.log(data);
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
  private selectEvent(index) {
    this.search=false;
    this.event.setValue(this.eventsSearch[index].title);
  }
  private onClickOutside() {
    if(this.search){
      this.search=false;
    }
  }
  private getApplicationEvents(){
    // Get application
    this.applicationService.getApplication(this.applicationId,this.authService.user.username,this.localizeService.parser.currentLang).subscribe(data => {
      if(data.success){
        this.application=data.application;
        this.eventsApplication=data.application.eventsArray;
        this.placesApplication=data.application.places;
        this.categoryApplication=data.application.category;
        this.deleteTrigger.next();
      }
    });
  }
  // Function to get events from the database
  private getEvents() {
    this.eventService.getEvents(this.localizeService.parser.currentLang).subscribe(data => {
      console.log(data);
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
    this.eventService.eventSearch(this.searchTerm,this.localizeService.parser.currentLang).subscribe(data=>{
      console.log(data);
      if(data.success){
        this.eventsSearch=data.events;
        this.search=true; 
        console.log(this.eventsSearch);
  
      }     
    }); 	  
  }

}
