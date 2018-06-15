import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalizeRouterService } from 'localize-router';
import { AuthService } from '../../../services/auth.service';
import { ServiceTypeService } from '../../../services/service-type.service';
import { TranslateService,LangChangeEvent } from '@ngx-translate/core';
import { ServiceTypeModalComponent } from './service-type-modal/service-type-modal.component';
import { ModalComponent } from '../../../templates/modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ObservableService } from '../../../services/observable.service';
import { AlphanumericValidator } from '../../../validators';
import { ServiceType } from '../../../class/service-type';
import { GroupByPipe } from '../../../shared/pipes/group-by.pipe';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import {DataTableDirective} from 'angular-datatables';
@Component({
  selector: 'app-create-service-type',
  templateUrl: './create-service-type.component.html',
  styleUrls: ['./create-service-type.component.css']
})
export class CreateServiceTypeComponent implements OnInit {
  private message;
  private messageClass;
  private subscriptionObservableSuccess: Subscription;
  private subscriptionObservableDelete: Subscription;
  private subscriptionLanguage: Subscription;
  private submitted:boolean = false;
  @ViewChild(DataTableDirective)
  private dtElement: DataTableDirective;
  private services;
  private dtOptions: any = {};
  private dtTrigger: Subject<any> = new Subject();
  constructor(
    private localizeService:LocalizeRouterService,
    private serviceTypeService:ServiceTypeService,
    private authService:AuthService,
    private observableService:ObservableService,
    private modalService: NgbModal,
    private groupByPipe:GroupByPipe,
    private translate: TranslateService){
    }
  private serviceTypeStaticModalShow(serviceType) {
    const activeModal = this.modalService.open(ServiceTypeModalComponent, {backdrop: 'static'});
    activeModal.componentInstance.inputServiceType = serviceType;

  }
  private staticModalShow() {
    const activeModal = this.modalService.open(ModalComponent, {backdrop: 'static'});
    activeModal.componentInstance.modalHeader = 'Modal serviceType';
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
    private serviceTypeEditClick(serviceType): void {
    if(this.observableService.modalCount<1){
      this.serviceTypeStaticModalShow(serviceType);
    }
  }
  private serviceTypeDeleteClick(index,serviceType): void {
    this.observableService.modalType="modal-delete-serviceType";
    if(this.observableService.modalCount<1){
      this.staticModalShow();
      this.subscriptionObservableDelete=this.observableService.notifyObservable.subscribe(res => {
        this.subscriptionObservableDelete.unsubscribe();
        if (res.hasOwnProperty('option') && res.option === 'modal-delete-serviceType') {
          this.serviceTypeService.deleteServiceType(serviceType._id,this.localizeService.parser.currentLang).subscribe(data=>{
            if(data.success){  
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
  private observableServiceTypeSuccess(){
    this.subscriptionObservableSuccess=this.observableService.notifyObservable.subscribe(res => {
      console.log(res);
      if (res.hasOwnProperty('option') && res.option === 'modal-edit-service-type-success') {
       this.getServiceTypes();
      } 
    });   
  }
 private getServiceTypesInit(){
    //Get thematic
      this.serviceTypeService.getServiceTypes(this.localizeService.parser.currentLang).subscribe(data=>{
        if(data.success){           
          this.dtTrigger.next();
        }    
      });                 
  }
  private getServiceTypes(){
    //Get thematic
      this.serviceTypeService.getServiceTypes(this.localizeService.parser.currentLang).subscribe(data=>{
        if(data.success){    
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            this.dtTrigger.next();
          });
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
    this.getServiceTypesInit();
    this.observableServiceTypeSuccess();
    this.subscriptionLanguage =this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.localizeService.parser.currentLang=event.lang;
      this.getServiceTypes(); 
    });
  	/*this.authService.getAllServiceTypes(this.localizeService.parser.currentLang).subscribe(data=>{
      if(data.success){
        if(data.permission==="admin" || data.permission==="moderator"){
          this.getAllThemes(); 	     
        }       
      }     
    });*/     	  
  }
  ngOnDestroy(){
      this.subscriptionLanguage.unsubscribe();
  }
}



