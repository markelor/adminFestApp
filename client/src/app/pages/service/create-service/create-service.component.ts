import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalizeRouterService } from 'localize-router';
import { AuthService } from '../../../services/auth.service';
import { ServiceService } from '../../../services/service.service';
import { TranslateService,LangChangeEvent } from '@ngx-translate/core';
import { ServiceModalComponent } from './service-modal/service-modal.component';
import { ModalComponent } from '../../../templates/modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ObservableService } from '../../../services/observable.service';
import { AlphanumericValidator } from '../../../validators';
import { Service } from '../../../class/service';
import { GroupByPipe } from '../../../shared/pipes/group-by.pipe';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import {DataTableDirective} from 'angular-datatables';
@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.css']
})
export class CreateServiceComponent implements OnInit {
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
    private serviceService:ServiceService,
    private authService:AuthService,
    private observableService:ObservableService,
    private modalService: NgbModal,
    private groupByPipe:GroupByPipe,
    private translate: TranslateService){
    }
  private serviceStaticModalShow(service) {
    const activeModal = this.modalService.open(ServiceModalComponent, {backdrop: 'static'});
    activeModal.componentInstance.inputService = service;

  }
  private staticModalShow() {
    const activeModal = this.modalService.open(ModalComponent, {backdrop: 'static'});
    activeModal.componentInstance.modalHeader = 'Modal service';
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
    private serviceEditClick(service): void {
    if(this.observableService.modalCount<1){
      this.serviceStaticModalShow(service);
    }
  }
  private serviceDeleteClick(index,service): void {
    this.observableService.modalType="modal-delete-service";
    if(this.observableService.modalCount<1){
      this.staticModalShow();
      this.subscriptionObservableDelete=this.observableService.notifyObservable.subscribe(res => {
        this.subscriptionObservableDelete.unsubscribe();
        if (res.hasOwnProperty('option') && res.option === 'modal-delete-service') {
          this.serviceService.deleteService(service._id,this.localizeService.parser.currentLang).subscribe(data=>{
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
  private observableServiceSuccess(){
    this.subscriptionObservableSuccess=this.observableService.notifyObservable.subscribe(res => {
      console.log(res);
      if (res.hasOwnProperty('option') && res.option === 'modal-edit-service-success') {
       this.getServices();
      } 
    });   
  }
 private getServicesInit(){
    //Get thematic
      this.serviceService.getServices(this.localizeService.parser.currentLang).subscribe(data=>{
        if(data.success){           
          this.services=this.groupByPipe.transform(data.services,'firstParentId');
          this.dtTrigger.next();
        }    
      });                 
  }
  private getServices(){
    //Get thematic
      this.serviceService.getServices(this.localizeService.parser.currentLang).subscribe(data=>{
        if(data.success){    
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            this.services=this.groupByPipe.transform(data.services,'firstParentId');
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
    this.getServicesInit();
    this.observableServiceSuccess();
    this.subscriptionLanguage =this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.localizeService.parser.currentLang=event.lang;
      this.getServices(); 
    });
  	/*this.authService.getAllServices(this.localizeService.parser.currentLang).subscribe(data=>{
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



