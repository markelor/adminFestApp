import { Component, OnInit,Injectable,Input,ViewChild } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { LocalizeRouterService } from 'localize-router';
import { AuthService } from '../../../services/auth.service';
import { EventService } from '../../../services/event.service';
import { AplicationService } from '../../../services/aplication.service';
import { TranslateService } from '@ngx-translate/core';
import { Aplication } from '../../../class/aplication';
import { Subject } from 'rxjs/Subject';
import {DataTableDirective} from 'angular-datatables';

@Component({
  selector: 'app-events-aplication-form',
  templateUrl: './events-aplication-form.component.html',
  styleUrls: ['./events-aplication-form.component.css']
})
export class EventsAplicationFormComponent implements OnInit {
  private message;
  private messageClass;
  private form:FormGroup;
  private event:AbstractControl;
  @Input() aplicationId;
  private aplication;
  private events=[];
  @ViewChild(DataTableDirective)
  private dtElement: DataTableDirective;
  private dtOptions: any = {};
  private dtTrigger: Subject<any> = new Subject();
  private search:boolean=true;
  private eventsSearch;
  private searchTerm = new Subject<string>();
  constructor(
    private fb: FormBuilder,
    private localizeService:LocalizeRouterService,
    private aplicationService:AplicationService,
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
  private addEvent(){
    var index=this.eventsSearch.map(event => event.title).indexOf(this.event.value);
    if(this.event.value && !this.aplication.events.includes(this.eventsSearch[index]._id) && this.eventsSearch.filter(event => event.title === this.event.value).length > 0){
      this.aplication.events.push(this.eventsSearch[index]._id);
      this.event.setValue("");
      // Edit aplication
      this.aplicationService.editAplication(this.aplication).subscribe(data => {
        console.log(data);
        if(data.success){ 
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            this.events.push(this.eventsSearch[index]);
            // Call the dtTrigger to rerender again
            this.dtTrigger.next();
          });
        }
      });
    }
  }
  private deleteEvent(indexEvent){
      var indexAplicatonEvent=this.aplication.events.indexOf(this.events[indexEvent]._id);
      this.aplication.events.splice(indexAplicatonEvent,1);
      // Edit aplication
      this.aplicationService.editAplication(this.aplication).subscribe(data => {
        if(data.success){ 
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            this.events.splice(indexEvent,1);
            // Call the dtTrigger to rerender again
            this.dtTrigger.next();
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
  private getAllAplicationEvents(){
    // Get aplication
    this.aplicationService.getAplication(this.aplicationId,this.authService.user.username,this.localizeService.parser.currentLang).subscribe(data => {
      console.log(data);
      if(data.success){
        this.aplication=data.aplication;
        this.events=data.events;
        this.dtTrigger.next();
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
    this.getAllAplicationEvents();
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
