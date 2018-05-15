import { Component, OnInit,Injectable,Input } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { LocalizeRouterService } from 'localize-router';
import { AuthService } from '../../../services/auth.service';
import { EventService } from '../../../services/event.service';
import { AplicationService } from '../../../services/aplication.service';
import { TranslateService } from '@ngx-translate/core';
//import { AplicationModalComponent } from './aplication-modal/aplication-modal.component';
import { ModalComponent } from '../../../templates/modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ObservableService } from '../../../services/observable.service';
import { AlphanumericValidator } from '../../../validators';
import { Aplication } from '../../../class/aplication';
import { GroupByPipe } from '../../../shared/pipes/group-by.pipe';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-events-aplication-form',
  templateUrl: './events-aplication-form.component.html',
  styleUrls: ['./events-aplication-form.component.css']
})
export class EventsAplicationFormComponent implements OnInit {
  private message;
  private messageClass;
  private subscription: Subscription;
  private submitted:boolean = false;
  private parentCategories;
  private form:FormGroup;
  private event:AbstractControl;
  @Input() aplication;
  @Input() events;
  private eventsArray;
  private dtElement: DataTableDirective;
  private dtOptions: any = {};
  private dtTrigger: Subject<any> = new Subject();
  private search:boolean=true;
  private eventsSearch;
  private selectedEvents=[];
  private searchTerm = new Subject<string>();
  constructor(
    private fb: FormBuilder,
    private localizeService:LocalizeRouterService,
    private aplicationService:AplicationService,
    private authService:AuthService,
    private eventService:EventService,
    private observableService:ObservableService,
    private modalService: NgbModal,
    private groupByPipe:GroupByPipe,
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
  // Function to disable the registration form
  private disableForm(){
    this.form.disable(); // Disable form
  }
   // Function to enable the registration form
   private enableForm(){
    this.form.enable(); // Enable form
  }
  private onSubmit(){
    if (this.form.valid) {
      this.submitted = true;
      //this.disableForm();
      this.aplication.setLanguage=this.localizeService.parser.currentLang;
      this.aplication.setEvents=this.selectedEvents;
      this.aplicationService.newAplication(this.aplication).subscribe(data=>{
        if(!data.success){
          this.submitted = false;
          this.messageClass='alert alert-danger ks-solid';
          this.message=data.message
          this.enableForm();
        }else{
          this.submitted = false;
          //this.category=new Category();
          //this.getAllCategories();
          this.createForm(); // Reset all form fields
          this.eventsSearch=[];
          this.messageClass='alert alert-success ks-solid'
          this.message=data.message
        }
      });
    }   
  }
  /*private categoryStaticModalShow(category) {
    const activeModal = this.modalService.open(AplicationModalComponent, {size: 'sm',backdrop: 'static'});
    activeModal.componentInstance.oldCategory = category;
    activeModal.componentInstance.oldParentCategories = this.parentCategories;

  }*/
  private staticModalShow() {
    const activeModal = this.modalService.open(ModalComponent, {size: 'sm',backdrop: 'static'});
    activeModal.componentInstance.modalHeader = 'Modal category';
    activeModal.componentInstance.modalContent = `This is static modal, backdrop click
 will not close it. Click × or confirmation button to close modal.`;

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
    private categoryEditClick(category): void {
    this.observableService.modalType="modal-edit-category";
    if(this.observableService.modalCount<1){
      //this.categoryStaticModalShow(category);
      this.subscription=this.observableService.notifyObservable.subscribe(res => {
        this.subscription.unsubscribe();
        if (res.hasOwnProperty('option') && res.option === 'modal-edit-category') {
          if(res.data.success){
              this.messageClass = 'alert alert-success ks-solid '; // Set bootstrap success class
              this.message = res.data.message; // Set success message
              
            }else{
              this.messageClass = 'alert alert-danger ks-solid'; // Set bootstrap error class
              this.message = res.data.message; // Set error message
            }
          
        }
      });
    }
  }
  /*private categoryDeleteClick(index,category): void {
    this.observableService.modalType="modal-delete-category";
    if(this.observableService.modalCount<1){
      this.staticModalShow();
      this.subscription=this.observableService.notifyObservable.subscribe(res => {
        this.subscription.unsubscribe();
        if (res.hasOwnProperty('option') && res.option === 'modal-delete-category') {
          this.categoryService.deleteCategory(category._id,this.localizeService.parser.currentLang).subscribe(data=>{
            if(data.success){  
              this.parentCategories.splice(index,1);
              this.messageClass = 'alert alert-success ks-solid'; // Set bootstrap success class
              this.message = data.message; // Set success messag
            }else{
              this.messageClass = 'alert alert-danger ks-solid'; // Set bootstrap error class
              this.message = data.message; // Set error message
            }
          });
        }
      });
    }
  }

  private getAllCategories(){
    //Get thematic
      this.categoryService.getAllCategories(this.localizeService.parser.currentLang).subscribe(data=>{
        if(data.success){        
          this.parentCategories=data.categories;  
          this.categories=this.groupByPipe.transform(data.categories,'firstParentId');
          this.dtTrigger.next();
        }    
      });                 
  }*/
  private addEvent(){
    if(this.event.value && !this.selectedEvents.includes(this.event.value) && this.eventsSearch.filter(event => event.title === this.event.value).length > 0){
      var index=this.eventsSearch.map(event => event.title).indexOf(this.event.value);
      this.aplication.events.push(this.eventsSearch[index]._id);
      console.log(this.aplication);
      this.selectedEvents.push(this.event.value);
      this.event.setValue("");
    }
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
  ngOnInit() {
    $('textarea').each(function () {
      this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
    }).on('input', function () {
      this.style.height = (this.scrollHeight) + 'px';
    }); 
    this.eventsArray=this.events;
    this.createSettings();
    this.eventsArray=this.events;
    this.dtTrigger.next();
    /*this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      this.events=this.events;
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });*/
    this.eventService.eventSearch(this.searchTerm,this.localizeService.parser.currentLang).subscribe(data=>{
      console.log(data);
      if(data.success){
        this.eventsSearch=data.events;
        this.search=true; 
        console.log(this.eventsSearch);
        /*if(!$('.ks-search-form.nav-item.dropdown.show')[0]){
          $('.ks-search-form.nav-item.dropdown').addClass('show');
        } */  
      }     
    });
    //this.createSettings(); 
    //this.getAllCategories();
  	/*this.authService.getAllCategorys(this.localizeService.parser.currentLang).subscribe(data=>{
      if(data.success){
        if(data.permission==="admin" || data.permission==="moderator"){
          this.getAllThemes(); 	     
        }       
      }     
    });*/     	  
  }

}
