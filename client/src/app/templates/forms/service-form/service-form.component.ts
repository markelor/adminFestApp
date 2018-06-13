import { Component, OnInit, ViewChild, Input} from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { LocalizeRouterService } from 'localize-router';
import { AuthService } from '../../../services/auth.service';
import { ServiceService } from '../../../services/service.service';
import { ObservableService } from '../../../services/observable.service';
import { TranslateService,LangChangeEvent } from '@ngx-translate/core';
import { AlphanumericValidator,LatitudeValidator,LongitudeValidator } from '../../../validators';
import { Service } from '../../../class/service';
import { GroupByPipe } from '../../../shared/pipes/group-by.pipe';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.css']
})
export class ServiceFormComponent implements OnInit {
  private message;
  private messageClass;
  private submitted:boolean = false;
  private form:FormGroup;
  @Input() inputOperation:string;
  @Input() inputService;
  @Input() inputLanguage;
  private title:AbstractControl;
  private description:AbstractControl;
  private lat:AbstractControl;
  private lng:AbstractControl;
  private services;
  private service:Service=new Service();
  private subscriptionObservable: Subscription;
  constructor(
    private fb: FormBuilder,
    private localizeService:LocalizeRouterService,
    private serviceService:ServiceService,
    private observableService:ObservableService,
    private authService:AuthService,
    private groupByPipe:GroupByPipe,
    private translate: TranslateService){
    this.createForm(); // Create new theme form on start up
    }
    // Function to create new theme form
  private createForm() {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(35),
        Validators.minLength(3),
        AlphanumericValidator.validate
      ])],
      description: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(200),
        Validators.minLength(5)
      ])],
      lat: ['', Validators.compose([
        Validators.required,LatitudeValidator.validate
      ])],
      lng: ['', Validators.compose([
        Validators.required,LongitudeValidator.validate
      ])],
    })
    this.title = this.form.controls['title'];
    this.description= this.form.controls['description'];
    this.lat = this.form.controls['lat'];
    this.lng = this.form.controls['lng'];
  }
  private initializeForm(){  
    if(this.inputService){
      if(this.inputService.parentId){
        this.form.controls['parentService'].setValue(this.inputService.parentId);
      }else{
        this.form.controls['parentService'].setValue('');
      }
      var hasTranslation=false;

      for (var i = 0; i < this.inputService.translation.length; ++i) {
        if(this.inputService.translation[i].language===this.inputLanguage){
          hasTranslation=true;
          this.form.controls['title'].setValue(this.inputService.translation[i].title);
          this.form.controls['description'].setValue(this.inputService.translation[i].description);  
        }
      }
      if(!hasTranslation){
        if(this.inputService.language===this.inputLanguage){ 
          this.form.controls['title'].setValue(this.inputService.title);
          this.form.controls['description'].setValue(this.inputService.description);      
        }
      }  
    }     
  }
  private observableEdit(){
    this.subscriptionObservable=this.observableService.notifyObservable.subscribe(res => {
      this.subscriptionObservable.unsubscribe();
      if (res.hasOwnProperty('option') && res.option === 'modal-edit-service') {
        if(this.inputService && res.language===this.inputLanguage){
          var hasTranslation=false;
          this.inputService.parentId=this.form.get('parentService').value;
          for (var i = 0; i < this.inputService.translation.length; ++i) {
            if(this.inputService.translation[i].language===this.inputLanguage){
              hasTranslation=true;
              this.inputService.translation[i].language=this.inputLanguage;
              this.inputService.translation[i].title=this.form.get('title').value;
              this.inputService.translation[i].description=this.form.get('description').value;
            }
          }
          if(!hasTranslation){
            if(this.inputService.language===this.inputLanguage){
              this.inputService.language=this.inputLanguage,        
              this.inputService.title=this.form.get('title').value;
              this.inputService.description=this.form.get('description').value;
            }else{
              var translationObj={
                language:this.inputLanguage,
                title:this.form.get('title').value,
                description:this.form.get('description').value
              }
              this.inputService.translation.push(translationObj);             
            }
          }
          this.serviceService.editService(this.inputService).subscribe(data=>{
            if(data.success){
              this.observableService.modalType="modal-edit-service-success";
              this.observableService.notifyOther({option: this.observableService.modalType,service:this.inputService});
              this.messageClass = 'alert alert-success ks-solid '; // Set bootstrap success class
              this.message =data.message; // Set success message            
            }else{
              this.messageClass = 'alert alert-danger ks-solid'; // Set bootstrap error class
              this.message =data.message; // Set error message
            } 
          }); 
        }     
      }
    });
  }
  // Function to disable the registration form
  private disableForm(){
    this.form.disable(); // Disable form
  }
   // Function to enable the registration form
   private enableForm(){
    this.form.enable(); // Enable form
  }
 /* private onSelectedParentService(index){
    if(index===-1){
      this.form.controls['parentService'].setValue("");
    }else{
      this.service.setLevel=this.inputParentCategories[index].level+1;
      this.inputService.level=this.inputParentCategories[index].level+1;
      if(this.inputParentCategories[index].parentId){
        this.service.setFirstParentId=this.inputParentCategories[index].firstParentId;
        this.inputService.setFirstParentId=this.inputParentCategories[index].firstParentId;
      }else{
        this.inputService.setFirstParentId=this.inputParentCategories[index]._id;
        this.inputService.setFirstParentId=this.inputParentCategories[index]._id;
      }
    }
  }
  private onSubmit(){
    if (this.form.valid) {
      this.submitted = true;
      //this.disableForm();
      this.service.setLanguage=this.localizeService.parser.currentLang,
      this.service.setParentId=this.form.get('parentService').value;
      this.service.setTitle=this.form.get('title').value;
      this.service.setDescription=this.form.get('description').value;
      this.serviceService.newService(this.service).subscribe(data=>{
        if(!data.success){
          this.messageClass='alert alert-danger ks-solid';
          this.message=data.message
          this.enableForm();
        }else{
          this.observableService.modalType="modal-edit-service-success";
          this.observableService.notifyOther({option: this.observableService.modalType});
          this.submitted = false;
          this.service=new Service();
          this.createForm(); // Reset all form fields
          this.messageClass='alert alert-success ks-solid'
          this.message=data.message
        }
      });
    }                
  }*/
  ngOnInit() {
    /*$('textarea').each(function () {
      this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
    }).on('input', function () {
      this.style.height = (this.scrollHeight) + 'px';
    });*/
    this.initializeForm();
    this.observableEdit();  	  
  }
}
