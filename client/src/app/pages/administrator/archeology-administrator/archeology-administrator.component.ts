import { Component, OnInit } from '@angular/core';
import { LocalizeRouterService } from 'localize-router';
import { AuthService } from '../../../services/auth.service';
//import { ThemeService } from '../../../services/theme.service';
import { TranslateService } from '@ngx-translate/core';
import { ModalComponent } from '../../../templates/modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ObservableService } from '../../../services/observable.service';
import { Subscription } from 'rxjs/Subscription';
//import { FileUploaderService} from '../../../services/file-uploader.service';
import { Subject } from 'rxjs/Subject';
import { BindContentPipe } from '../../../shared/pipes/bind-content.pipe';
import { ArcheologyModalComponent } from './archeology-modal/archeology-modal.component';

@Component({
  selector: 'app-archeology-administrator',
  templateUrl: './archeology-administrator.component.html',
  styleUrls: ['./archeology-administrator.component.css']
})
export class ArcheologyAdministratorComponent implements OnInit {
  private language:string;
  private themesArcheology;
  private messageClass;
  private message;
  private subscription: Subscription;
  private dtOptions: any = {};
  private dtTrigger: Subject<any> = new Subject();

  constructor(
    private localizeService:LocalizeRouterService,
    private authService:AuthService,
    /*private themeService:ThemeService,
    private fileUploaderService:FileUploaderService,*/
    private observableService:ObservableService,
    private translate: TranslateService,
    private modalService: NgbModal,
    private bindContent: BindContentPipe){ }

  private archeologyStaticModalShow(archeology) {
    const activeModal = this.modalService.open(ArcheologyModalComponent, {size: 'sm',backdrop: 'static'});
    activeModal.componentInstance.oldArcheology = archeology;
  }
  private staticModalShow() {
    const activeModal = this.modalService.open(ModalComponent, {size: 'sm',backdrop: 'static'});
    activeModal.componentInstance.modalHeader = 'Modal archeology';
    activeModal.componentInstance.modalContent = `This is static modal, backdrop click
 will not close it. Click × or confirmation button to close modal.`;

  }
  private createSettings(){
    this.dtOptions = {
      // Declare the use of the extension in the dom parameter
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [
        'columnsToggle',
        /*'colvis',*/
        'copy',
        'print',
        'excel'
      ],
      responsive: true
    };

  }
  private themeArcheologyEditClick(archeology): void {

    this.observableService.modalType="modal-edit-archeology";
    if(this.observableService.modalCount<1){
      this.archeologyStaticModalShow(archeology);
      this.subscription=this.observableService.notifyObservable.subscribe(res => {
        this.subscription.unsubscribe();
        if (res.hasOwnProperty('option') && res.option === 'modal-edit-archeology') {
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
  private deleteUploadImages(type,index,images){
    if(type==='principal'){
      /*for (var i = 0; i < images.length; ++i) {
        this.fileUploaderService.deleteImages(images[i].key,"theme",this.localizeService.parser.currentLang).subscribe(data=>{
          if(data.success){ 
            this.themesArcheology.splice(index,1);
            this.messageClass = 'alert alert-success ks-solid'; // Set bootstrap success class
            this.message = data.message; // Set success message
          }
        });
      }*/
    }else if(type==='description'){
       /*for (var i = 0; i < images.length; i++) {
        var currentUrlSplit = images[i].split("/");
        let imageName = currentUrlSplit[currentUrlSplit.length - 1];
        var urlSplit = imageName.split("%2F");
        this.fileUploaderService.deleteImages(urlSplit[1],urlSplit[0],this.localizeService.parser.currentLang).subscribe(data=>{
        });
      }*/
    }
    
  }
  private themeArcheologyDeleteClick(index,archeology): void {
    /*this.observableService.modalType="modal-delete-archeology";
    if(this.observableService.modalCount<1){
      this.staticModalShow();
      this.subscription=this.observableService.notifyObservable.subscribe(res => {
        this.subscription.unsubscribe();
        if (res.hasOwnProperty('option') && res.option === 'modal-delete-archeology') {
          this.themeService.deleteTheme(this.bindContent.transform(archeology,this.localizeService.parser.currentLang,'_id',undefined),this.localizeService.parser.currentLang).subscribe(data=>{
            if(data.success){  
              var deleteSuccess=false;
              if(data.images.principal){
                this.deleteUploadImages('principal',index,data.images.principal);
                deleteSuccess=true;
              }
              if(data.images.description){
                this.deleteUploadImages('description',index,data.images.description);         
              } 
            }else{
              this.messageClass = 'alert alert-danger ks-solid'; // Set bootstrap error class
              this.message = data.message; // Set error message
            }
          });
        }
      });
    }*/
  }
  private getAllThemes(){
    //Get thematic
    /*this.translate.get('create-theme.thematic-archeology').subscribe(thematic => { 
      this.themeService.getAllThemesThematic(thematic,undefined,this.localizeService.parser.currentLang).subscribe(data=>{
        if(data.success){
          this.themesArcheology=data.themes;  
          this.dtTrigger.next();        
        }    
      });                 
    });*/
  }
  ngOnInit() {
    this.language=this.localizeService.parser.currentLang;
  	this.authService.getAllUsers(this.localizeService.parser.currentLang).subscribe(data=>{
      if(data.success){
        if(data.permission==="admin" || data.permission==="moderator"){
          this.getAllThemes(); 	     
        }       
      }     
    });     	  
  }
}



