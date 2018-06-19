import { Component, OnInit, ViewChild, Input} from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { LocalizeRouterService } from 'localize-router';
import { AuthService } from '../../../services/auth.service';
import { ServiceTypeService } from '../../../services/service-type.service';
import { ServiceService } from '../../../services/service.service';
import { PlaceService } from '../../../services/place.service';
import { ObservableService } from '../../../services/observable.service';
import { TranslateService,LangChangeEvent } from '@ngx-translate/core';
import { FileUploaderService} from '../../../services/file-uploader.service';
import { TitleValidator,LatitudeValidator,LongitudeValidator } from '../../../validators';
import { Service } from '../../../class/service';
import { Place } from '../../../class/place';
import { GroupByPipe } from '../../../shared/pipes/group-by.pipe';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { AuthGuard} from '../../../pages/guards/auth.guard';
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
  private imagesDescription=[];
  private title:AbstractControl;
  private description:AbstractControl;
  private serviceType:AbstractControl;
  private province:AbstractControl;
  private municipality:AbstractControl;
  private locationsExists:AbstractControl;
  private location:AbstractControl;
  private lat:AbstractControl;
  private lng:AbstractControl;
  private serviceTypes;
  private service:Service=new Service();
  private place:Place=new Place();
  private locationsExistsService=[];
  private provincesService;
  private municipalitiesService;
  private serviceTypeIcon;
  private subscriptionObservable: Subscription;
  private froalaSignature;
  private froalaEvent;
  private subscriptionLanguage: Subscription;
  constructor(
    private fb: FormBuilder,
    private localizeService:LocalizeRouterService,
    private serviceService:ServiceService,
    private serviceTypeService: ServiceTypeService,
    private placeService: PlaceService,
    private observableService:ObservableService,
    private fileUploaderService:FileUploaderService,
    private authService:AuthService,
    private groupByPipe:GroupByPipe,
    private translate: TranslateService,
    private router:Router,
    private authGuard: AuthGuard,){
    this.createForm(); // Create new theme form on start up
    }
    // Function to create new theme form
  private createForm() {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(35),
        Validators.minLength(3),
        TitleValidator.validate
      ])],
      description: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(20000),
        Validators.minLength(50)
      ])],
      serviceType: ['', Validators.compose([
        Validators.required
      ])],
      province: ['', Validators.compose([
        Validators.required
      ])],
      municipality: ['', Validators.compose([
        Validators.required
      ])],
      locationsExists: ['', Validators.compose([
        Validators.required,Validators.maxLength(1000)
      ])],
      location: ['', Validators.compose([
        Validators.required,Validators.maxLength(1000)
      ])],
      lat: ['', Validators.compose([
        Validators.required,LatitudeValidator.validate
      ])],
      lng: ['', Validators.compose([
        Validators.required,LongitudeValidator.validate
      ])]

    })
    this.title = this.form.controls['title'];
    this.description= this.form.controls['description'];
    this.serviceType = this.form.controls['serviceType'];
    this.province = this.form.controls['province'];
    this.municipality = this.form.controls['municipality'];
    this.locationsExists = this.form.controls['locationsExists'];
    this.location = this.form.controls['location'];
    this.lat = this.form.controls['lat'];
    this.lng = this.form.controls['lng'];
  }
    // Function to disable the registration form
  private disableForm(){
    this.form.disable(); // Disable form
  }
  // Function to enable the registration form
  private enableForm(){
    this.form.enable(); // Enable form
  }
  private deleteUploadImages(type,images){
    if(type==='descriptionOne'){
      var currentUrlSplit = images[0].currentSrc.split("/");
      let imageName = currentUrlSplit[currentUrlSplit.length - 1];
      var urlSplit = imageName.split("%2F");
      for (var i = 0; i < this.imagesDescription.length; i++) {
        if(this.imagesDescription[i]===images[0].currentSrc){
          this.imagesDescription.splice(i,1);
          this.service.setImagesDescription=this.imagesDescription;
        }
      }
      this.fileUploaderService.deleteImages(urlSplit[1],urlSplit[0],this.localizeService.parser.currentLang).subscribe(data=>{
      });
    }else if (type==='descriptionAll'){
      for (var i = 0; i < this.imagesDescription.length; i++) {
        var currentUrlSplit = this.imagesDescription[i].split("/");
        let imageName = currentUrlSplit[currentUrlSplit.length - 1];
        var urlSplit = imageName.split("%2F");
        this.fileUploaderService.deleteImages(urlSplit[1],urlSplit[0],this.localizeService.parser.currentLang).subscribe(data=>{
        });
      }
    }
  }
  private initializeForm(){  
    if(this.inputService){
      //Get lat on page load
      this.lat.setValue(this.inputService.coordinates.lat);
      //Get lng on page load
      this.lng.setValue(this.inputService.coordinates.lng);    
      //Get images description on page load
      this.imagesDescription=this.inputService.images;
      var hasTranslation=false;
      //Get images title and description
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
      //general place translation
      if(this.inputService.place.language===this.inputLanguage){
        this.locationsExists.setValue(this.inputService.place.location);  
      }else{
        for (var i = 0; i < this.inputService.place.translation.length; ++i) {
          if(this.inputService.place.translation[i].language===this.inputLanguage){
            this.locationsExists.setValue(this.inputService.place.translation[i].location);      
          }
        }    
      } 
      //Location validation
      this.placeService.getPlacesCoordinates(this.inputService.place.coordinates.lat,this.inputService.place.coordinates.lng,this.inputLanguage).subscribe(data=>{
        if(data.success && data.places.length>0){
          this.locationsExistsService=data.places;
          this.location.setValidators([Validators.compose([Validators.maxLength(1000)])]);
          this.location.updateValueAndValidity(); //Need to call this to trigger a update
        }else{
          this.locationsExistsService=[];
          this.locationsExists.setValue("");
        }
      }); 
      //Get categories on page load    
     /* (this.form.controls['categories'] as FormArray).removeAt(0);
      for (var j in this.inputCategories) {
        this.categoryId.push(this.inputCategories[j]._id);
        if(this.inputCategories[j].language===this.inputLanguage){
          (this.form.controls['categories'] as FormArray).push(this.createItem(this.inputCategories[j].title));
        }
        for (var k = 0; k < this.inputCategories[j].translation.length; ++k) {
          if(this.inputCategories[j].translation[k].language===this.inputLanguage){
            //console.log(this.inputLanguage);
            (this.form.controls['categories'] as FormArray).push(this.createItem(this.inputCategories[j].translation[k].title));
          }
        } 
      } */
      //Get provinces on page load
      this.placeService.getGeonamesJson('province',this.inputLanguage,'euskal-herria').subscribe(provincesService => {
        this.provincesService=provincesService.geonames;
        if(this.inputService.place.language===this.inputLanguage){
          this.province.setValue(this.inputService.place.province.name);
        }else{
          var traductionProvince=false;
          for (var i = 0; i < this.inputService.place.translation.length; ++i) {
            if(this.inputService.place.translation[i].language===this.inputLanguage){
              traductionProvince=true
              this.province.setValue(this.inputService.place.translation[i].province.name);
            }
          } 
          if(!traductionProvince){
            for (var i = 0; i < this.provincesService.length; ++i) {
              if(this.provincesService[i].geonameId===this.inputService.place.province.geonameId){
                this.province.setValue(this.provincesService[i].name);         
              }
            }      
          }    
        }          
      });  
      //Get municipality on page load      
      if(this.inputService.place.municipality){
        this.placeService.getGeonamesJson('municipality',this.inputLanguage,this.inputService.place.province.name.toLowerCase()).subscribe(municipalitiesService => {
          this.municipalitiesService=municipalitiesService.geonames;
          this.form.get('municipality').enable(); // Enable municipality field
          if(this.inputService.place.language===this.inputLanguage){
            this.municipality.setValue(this.inputService.place.municipality.name);
          }else{
            var traductionProvince=false;
            for (var i = 0; i < this.inputService.place.translation.length; ++i) {
              if(this.inputService.place.translation[i].language===this.inputLanguage){
                traductionProvince=true
                this.municipality.setValue(this.inputService.place.translation[i].municipality.name);
              }
            } 
            if(!traductionProvince){
              for (var i = 0; i < this.municipalitiesService.length; ++i) {
                if(this.municipalitiesService[i].geonameId===this.inputService.place.municipality.geonameId){
                  this.municipality.setValue(this.municipalitiesService[i].name);         
                }
              }      
            }    
          } 
        });        
      } 
    }     
  }
   private froalaOptions= {
     // Set max image size to 5MB.
    imageMaxSize: 5 * 1024 * 1024,
    // Allow to upload PNG and JPG.
    imageAllowedTypes: ['jpeg', 'jpg', 'png','gif'],
    charCounterMax: 20000,
    imageUploadToS3: undefined,
  }
  private initializeFroala(initControls) {
    this.froalaEvent=initControls;
    var context=this;
    this.fileUploaderService.getSignatureFroala("service-description",this.localizeService.parser.currentLang).subscribe(data=>{
      if(data.success){
        this.froalaOptions.imageUploadToS3=data.options
        initControls.initialize();
      }
    });
    setTimeout(() => {
      $('#textareaDescription'+this.inputLanguage).on('froalaEditor.image.inserted', function (e, editor, $img, response) {
        // Do something here.
        context.imagesDescription.push($img[0].currentSrc);
        console.log(context.imagesDescription);
        context.service.setImagesDescription=context.imagesDescription;
      });
      $('#textareaDescription'+this.inputLanguage)
        // Catch image remove
        .on('froalaEditor.image.removed', function (e, editor, $img) {
          if(!context.submitted){
            context.deleteUploadImages('descriptionOne',$img);
          }      
        }); 
      });  
  }
  private observableEdit(){
    this.subscriptionObservable=this.observableService.notifyObservable.subscribe(res => {
      this.subscriptionObservable.unsubscribe();
      if (res.hasOwnProperty('option') && res.option === 'modal-edit-service') {
        if(this.inputService && res.language===this.inputLanguage){
          var hasTranslation=false;
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
    private onSelectedServiceType(index){
    if(index===-1){
      this.form.controls['serviceType'].setValue("");
    }else{
      //set icon map
      this.serviceTypeIcon=this.serviceTypes[index].icons[0].url;
    }
  }
  // Function on seleccted service province
  private onSelectedProvince(index){
    if (index===-1){
      this.form.get('municipality').disable(); // Disable municipality field
    }else{
      this.form.get('municipality').enable(); // Enable municipality field
      this.placeService.getGeonamesJson('municipality',this.localizeService.parser.currentLang,this.provincesService[index].toponymName.toLowerCase()).subscribe(municipalitiesService => {
        this.place.setGeonameIdProvince=this.provincesService[index].geonameId;
        this.municipalitiesService=municipalitiesService.geonames;
      });
    }
    this.form.controls['municipality'].setValue("");
  }
  // Function on seleccted service municipality
  private onSelectedMunicipality(index){
    if(index!==-1){
      var coordinates={
        lat:this.municipalitiesService[index].lat,
        lng:this.municipalitiesService[index].lng
      }
      this.placeService.getPlacesCoordinates(this.municipalitiesService[index].lat,this.municipalitiesService[index].lng,this.localizeService.parser.currentLang).subscribe(data=>{
        console.log(data);
        if(data.success && data.places.length>0){
          console.log(data);
          this.locationsExistsService=data.places;
        }else{
          this.locationsExistsService=[];
          this.locationsExists.setValue("");
        }
      });
      this.passCoordinates(coordinates);
      this.place.setGeonameIdMunicipality=this.municipalitiesService[index].geonameId;
    }
  }
     // Function on seleccted locations exists
  private onSelectedLocationsExists(index){
     if (index===-1){
      this.locationsExists.setValidators([Validators.compose([Validators.maxLength(1000)])]);
      this.locationsExists.updateValueAndValidity(); //Need to call this to trigger a update
    }else{
      this.location.setValidators([Validators.compose([Validators.maxLength(1000)])]);
      this.location.updateValueAndValidity(); //Need to call this to trigger a update
    }
  }
  private chargeAll(){
    //Get service types
    this.serviceTypeService.getServiceTypes(this.localizeService.parser.currentLang).subscribe(data=>{
      if(data.success){
        this.serviceTypes=data.serviceTypes;
      }   
    });
    //Get provinces on page load
    if(this.inputOperation==='create'){
      this.placeService.getGeonamesJson('province',this.localizeService.parser.currentLang,'euskal-herria').subscribe(provincesService => {
        this.provincesService=provincesService.geonames;
      });
    }
  }
  private passCoordinates(defaultCoordinates){
    if (defaultCoordinates){
      var market_info={
        title:this.form.get('title').value,
        icon:this.serviceTypeIcon, // Icon field
        lat:defaultCoordinates.lat, // Lat field
        lng:defaultCoordinates.lng, // Lng field
      }
      this.lat.setValue(defaultCoordinates.lat);
      this.lng.setValue(defaultCoordinates.lng);
    }else{
      var market_info={
        title:this.form.get('title').value,
        icon:this.serviceTypeIcon, // Icon field
        lat:this.form.get('lat').value, // Lat field
        lng:this.form.get('lng').value, // Lng field
      }
    }  
    this.observableService.mapType="create-categories-coordinates";
    this.observableService.notifyOther({option: this.observableService.mapType, value: market_info});
  }
 
  private onSubmit(){
    if (this.form.valid) {
      this.submitted = true;
      //this.disableForm();
      this.service.setLanguage=this.localizeService.parser.currentLang,
      this.service.setServiceTypeId=this.form.get('serviceType').value;
      this.service.setTitle=this.form.get('title').value;
      this.service.setDescription=this.form.get('description').value;
      this.place.setProvince=this.form.get('province').value; // Province field
      this.place.setMunicipality=this.form.get('municipality').value; // Municipality field
      if(this.form.get('location').value){
        this.place.setLocation=this.form.get('location').value; //Location field,
      }else if(this.form.get('locationsExists').value){
        this.place.setLocation=this.form.get('locationsExists').value; //Location exists field,
      }
      this.place.setLat=Number(this.form.get('lat').value); // Lat field
      this.place.setLng=Number(this.form.get('lng').value); // Lng field
      console.log(this.service);
      /*this.serviceService.newService(this.event,this.place).subscribe(data=>{
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
      });*/
    }                
  }
  ngOnInit() {
    /*$('textarea').each(function () {
      this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
    }).on('input', function () {
      this.style.height = (this.scrollHeight) + 'px';
    });*/
    this.initializeForm();
    this.observableEdit();  
    // Get profile username on page load
    this.authService.getAuthentication(this.localizeService.parser.currentLang).subscribe(authentication => {
      if(!authentication.success){
        this.authService.logout();
        this.authGuard.redirectUrl=this.router.url;
        this.router.navigate([this.localizeService.translateRoute('/sign-in-route')]); // Return error and route to login page
      }
    });
    this.location.valueChanges.subscribe(data=>{
      if(data===''){
        this.locationsExists.setValidators([Validators.compose([Validators.required,Validators.maxLength(1000)])]);
        this.locationsExists.updateValueAndValidity(); //Need to call this to trigger a update
      }else{
        this.locationsExists.setValidators([Validators.compose([Validators.maxLength(1000)])]);
        this.locationsExists.updateValueAndValidity(); //Need to call this to trigger a update
      }
    });
    this.form.get('municipality').disable(); // Disable municipality field
    this.chargeAll();
    this.subscriptionLanguage =this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.localizeService.parser.currentLang=event.lang;
        this.chargeAll();
    }); 	  
  }
}
