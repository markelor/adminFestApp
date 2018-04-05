import { Component, OnInit,ElementRef } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AlphanumericValidator,LatitudeValidator,LongitudeValidator,DateValidator } from '../../../validators';
import { AuthService } from '../../../services/auth.service';
import { EventService } from '../../../services/event.service';
import { FileUploaderService} from '../../../services/file-uploader.service';
import { TranslateService } from '@ngx-translate/core';
import { FileUploader,FileUploaderOptions } from 'ng2-file-upload';
import { Router } from '@angular/router';
import { Event } from '../../../class/event';
import { LocalizeRouterService } from 'localize-router';
import { ObservableService } from '../../../services/observable.service';
import { AuthGuard} from '../../guards/auth.guard';
declare let $: any;
const URL = 'http://localhost:8080/fileUploader/uploadImages/event';
@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  private archeology:Event=new Event();
  private messageClass;
  private message;
  private newPost = false;
  private loadingThemes = false;
  private form:FormGroup;
  private commentForm:FormGroup;
  private submitted:boolean = false;
  private showMegalithicStation=false;
  private username;
  private imagesPrincipal=[];
  private imagesDescription=[];
  private title:AbstractControl;
  private category:AbstractControl;
  private province:AbstractControl;
  private municipality:AbstractControl;
  private coordinators:AbstractControl;
  private start:AbstractControl;
  private end:AbstractControl;
  private lat:AbstractControl;
  private lng:AbstractControl;
  private location:AbstractControl;
  private description:AbstractControl;
  private observations:AbstractControl;
  private discovery:AbstractControl;
  private bibliography:AbstractControl;
  private categories;
  private classesArcheology;
  private culturalSecuencesArcheology;
  private stagesArcheology;
  private provincesEvent;
  private countrysArcheology;
  private regionsArcheology;
  private municipalitiesEvent;
  private uploadAllSuccess:Boolean=true;
  private froalaSignature;
  private froalaEvent;
  private uploader:FileUploader = new FileUploader({
    url: URL,itemAlias: 'category',
    isHTML5: true,
    allowedMimeType: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'],
    maxFileSize: 10*1024*1024 // 10 MB
  });
  private uploadOptions;
  private hasBaseDropZoneOver:boolean = false;
  private hasAnotherDropZoneOver:boolean = false;
  //private subscriptionLanguage: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router:Router,
    private eventService: EventService,
    private fileUploaderService:FileUploaderService,
    private translate: TranslateService,
    private observableService: ObservableService,
    private elementRef: ElementRef,
    private localizeService: LocalizeRouterService,
    private authGuard: AuthGuard
  ) {
    this.createNewThemeForm(); // Create new category form on start up
  }

  // Function to create new category form
  private createNewThemeForm() {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(5),
        AlphanumericValidator.validate
      ])],
      category: ['', Validators.compose([
        Validators.required
      ])],
      province: ['', Validators.compose([
        Validators.required
      ])],
      municipality: ['', Validators.compose([
        Validators.required
      ])],
      coordinators: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(5),
        AlphanumericValidator.validate
      ])],
      start: ['', Validators.compose([
        Validators.required,DateValidator.validate
      ])],
      end: ['', Validators.compose([
        Validators.required,DateValidator.validate
      ])],
       lat: ['', Validators.compose([
        Validators.required,LatitudeValidator.validate
      ])],
      lng: ['', Validators.compose([
        Validators.required,LongitudeValidator.validate
      ])],
      location: ['', Validators.compose([
        Validators.maxLength(1000)
      ])],
      description: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(20000),
        Validators.minLength(50)
      ])],
      observations: ['', Validators.compose([
        Validators.maxLength(1000)
      ])],
      discovery: ['', Validators.compose([
        Validators.maxLength(1000)
      ])],
      bibliography: ['', Validators.compose([
        Validators.maxLength(1000)
      ])]

    })
    this.title = this.form.controls['title'];
    this.category = this.form.controls['category'];
    this.province = this.form.controls['province'];
    this.municipality = this.form.controls['municipality'];
    this.start = this.form.controls['start'];
    this.coordinators = this.form.controls['coordinators'];
    this.end = this.form.controls['end'];
    this.lat = this.form.controls['lat'];
    this.lng = this.form.controls['lng'];
    this.location = this.form.controls['location'];
    this.description= this.form.controls['description'];
    this.observations = this.form.controls['observations'];
    this.discovery = this.form.controls['discovery'];
    this.bibliography= this.form.controls['bibliography'];
  }

  // Enable new category form
  private enableFormNewThemeForm() {
    this.form.enable(); // Enable form
    $('#textareaDescription').froalaEditor('edit.on');
    this.froalaEvent.getEditor()('html.set', '');
  }

  // Disable new category form
  private disableFormNewThemeForm() {
    this.form.disable(); // Disable form
    $('#textareaDescription').froalaEditor('edit.off');
  }

  // Function to display new category form
  private newThemeForm() {
    this.newPost = true; // Show new category form
  }

  private fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
   // File upload controll
  private fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
  private onThemeSubmit(){
    if(this.uploader.queue.length>0){
      this.submitted = false; // Disable submit button
      this.disableFormNewThemeForm(); // Lock form
      this.uploader.uploadAll();
    }
  }
  // Function to upload  category post
  private createThemeArcheology() {
    // Create category object from form fields
    this.archeology.setLanguage=this.localizeService.parser.currentLang;// Language field
    this.archeology.setCreatedBy= this.username; // CreatedBy field
    this.archeology.setTitle= this.form.get('title').value; // Title field
    /*this.archeology.setTheme=this.form.get('category').value; // Theme field
    this.archeology.setClassTheme=this.form.get('class').value; // Class field
    this.archeology.setMegalithicStation=this.form.get('megalithicStation').value; // MegalithicStation field
    this.archeology.setCulturalSecuence=this.form.get('culturalSecuence').value; // CulturalSecuence field
    this.archeology.setStage=this.form.get('stage').value; // Stage field
    this.archeology.setContinent=this.form.get('continent').value; // Continent field
    this.archeology.setCountry=this.form.get('country').value; // Country field
    this.archeology.setRegion=this.form.get('region').value; // Region field
    this.archeology.setProvince=this.form.get('province').value, // Province field
    this.archeology.setMunicipality=this.form.get('municipality').value; // Municipality field
    this.archeology.setLat=this.form.get('lat').value; // Lat field
    this.archeology.setLng=this.form.get('lng').value; // Lng field
    this.archeology.setLocationDescription=this.form.get('location').value; //Location field,
    this.archeology.setDescription= this.form.get('description').value; // Description field
    this.archeology.setObservation=this.form.get('observations').value; // Observations field
    this.archeology.setDiscovery=this.form.get('discovery').value; // Discovery field
    this.archeology.setBibliography=this.form.get('bibliography').value; // Bibliography field*/
    // Function to save category into database
    this.eventService.newTheme(this.archeology).subscribe(data => {
      // Check if category was saved to database or not
      if (!data.success) {
        this.deleteUploadImages('principal',this.imagesPrincipal);
        this.deleteUploadImages('descriptionAll',this.imagesDescription);
        this.messageClass = 'alert alert-danger ks-solid'; // Return error class
        this.message = data.message; // Return error message
        this.submitted = true; // Enable submit button
        this.enableFormNewThemeForm(); // Enable form
      } else {
        this.createNewThemeForm(); // Reset all form fields
        this.messageClass = 'alert alert-success ks-solid'; // Return success class
        this.message = data.message; // Return success message
        // Clear form data after two seconds
        setTimeout(() => {
          this.newPost = false; // Hide form
          this.submitted = false; // Enable submit button
          this.message = false; // Erase error/success message
          this.uploader.clearQueue()//Reset uploader
          this.enableFormNewThemeForm(); // Enable the form fields
        }, 2000);
      }
    });  
  }
  private deleteUploadImages(type,images){
    if(type==='principal'){
      for (var i = 0; i < images.length; ++i) {
        this.fileUploaderService.deleteImages(images[i].key,"category",this.localizeService.parser.currentLang).subscribe(data=>{
        });
      }
    }else if(type==='descriptionOne'){
      var currentUrlSplit = images[0].currentSrc.split("/");
      let imageName = currentUrlSplit[currentUrlSplit.length - 1];
      var urlSplit = imageName.split("%2F");
      for (var i = 0; i < this.imagesDescription.length; i++) {
        if(this.imagesDescription[i]===images[0].currentSrc){
          this.imagesDescription.splice(i,1);
          //this.archeology.setImagesDescription=this.imagesDescription;
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
  // Function on seleccted archeology category
  private onSelectedThemeArcheology(index){
    if (index===-1){
      this.form.get('class').disable(); // Disable class field
      this.showMegalithicStation=false;
    }
    else if(index===0){
      this.form.get('class').enable(); // Enable stage field
      this.showMegalithicStation=true;
      this.classesArcheology=this.categories[index].classes;// To appear class when select category
    }     
    else{
      this.form.get('class').enable(); // Enable stage field
      this.showMegalithicStation=false;
      this.classesArcheology=this.categories[index].classes;// To appear class when select category
    }
    this.form.controls['class'].setValue("");    
  }
   
   // Function on seleccted archeology CulturalSecuence
  private onSelectedCulturalSecuenceArcheology(index){
    if (index===-1){
      this.form.get('stage').disable(); // Disable stage field
    }
    else{
      this.stagesArcheology=this.culturalSecuencesArcheology[index].stages;// To appear class when select category
      this.form.get('stage').enable(); // Enable stage field
    }
    this.form.controls['stage'].setValue("");
  }  
    
  // Function on seleccted archeology Continent
  private onSelectedProvinceEvent(index){
    if (index===-1){
      this.form.get('municipality').disable(); // Disable municipality field
    }else{
      this.form.get('municipality').enable(); // Enable municipality field
      //this.archeology.setContinentGeonameId=this.provincesEvent[index].toponymName.toLowerCase();
      this.eventService.getEventGeonamesJson('municipality',this.localizeService.parser.currentLang,this.provincesEvent[index].toponymName.toLowerCase()).subscribe(municipalitiesEvent => {
      this.municipalitiesEvent=municipalitiesEvent.geonames;
    });
    }
    this.form.controls['municipality'].setValue("");
  }
  // Function on seleccted archeology province
  private onSelectedMunicipality(index){
    if(index===-1){
      this.form.controls['municipality'].setValue("");
      this.form.get('municipality').disable(); // Disable municipality field
    }else{
    this.form.get('municipality').enable(); // Enable region field
    //this.archeology.setProvinceGeonameId=this.municipalititiesEvent[index].geonameId;

    }
  }
  private chargeAllJsonArchives(){
    //Get categories on page load
    this.eventService.getArcheologyThemesJson(this.localizeService.parser.currentLang).subscribe(categories => {
      this.categories=categories;
    });
    //Get cultural secuence on page load
    this.eventService.getArcheologyCulturalSecuenceJson(this.localizeService.parser.currentLang).subscribe(culturalSecuencesArcheology => {
      this.culturalSecuencesArcheology=culturalSecuencesArcheology;
    });

    //Get continents on page load
    this.eventService.getEventGeonamesJson('province',this.localizeService.parser.currentLang,'euskal-herria').subscribe(provincesEvent => {
      this.provincesEvent=provincesEvent.geonames;
    });
  }
  private passCoordinates(){
    var market_info={
      title:this.form.get('title').value,
      category:this.form.get('category').value, // Theme field
      class:this.form.get('class').value, // Class field
      lat:this.form.get('lat').value, // Lat field
      lng:this.form.get('lng').value, // Lng field
    }
    this.observableService.mapType="create-category-coordinates";
    this.observableService.notifyOther({option: this.observableService.mapType, value: market_info});
  }
  private setUploaderOptions(){
    this.authService.loadToken();
    const authHeader: Array<{
     name: string;
     value: string;
     }> = [];
     authHeader.push({name: 'Authorization' , value: 'Bearer '+this.authService.authToken});
    this.uploadOptions = <FileUploaderOptions>{headers : authHeader};
    this.uploader.setOptions(this.uploadOptions);
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    //override onBuildItemForm to pass parameter language to server
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('language', this.localizeService.parser.currentLang);
    };
     //override onErrorItem 
    this.uploader.onErrorItem = (item, response, status, headers) => {
    };
     //overide the onCompleteItem property of the uploader so we are 
    //able to deal with the server response.
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      //console.log("ImageUpload:uploaded:", item, status, response);
      const responseJson=JSON.parse(response);
      if(!responseJson.success){
        if(responseJson.authentication===false){
          this.authService.logout();
          this.authGuard.redirectUrl=this.router.url;
          this.router.navigate([this.localizeService.translateRoute('/sign-in-route')]);
        }
        this.uploadAllSuccess=false;
        this.submitted = true; // Enable submit button
        this.enableFormNewThemeForm(); // Enable form
      }else{
        this.imagesPrincipal.push(responseJson.file[0]);   
        if(this.uploader.progress===100 && this.uploadAllSuccess){
          //this.archeology.setImagesPrincipal=this.imagesPrincipal;
          this.createThemeArcheology();
        }
      } 
    };
    this.uploader.onWhenAddingFileFailed = (fileItem) => {
      if(fileItem.size>10*1024*1024){
        console.log("fitzategi haundiegia");
      }else if(!(fileItem.type === "image/png" ||fileItem.type === "image/jpg" ||fileItem.type === "image/jpeg" || fileItem.type === "image/gif")){
        console.log("formatu okerra");
      }
      console.log("fail", fileItem);
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
  private initialize(initControls) {
    this.froalaEvent=initControls;
    var context=this;
    this.fileUploaderService.getSignatureFroala().subscribe(data=>{
      if(data.success){
        this.froalaOptions.imageUploadToS3=data.options
        initControls.initialize();
      }
    });
    $('#textareaDescription').on('froalaEditor.image.inserted', function (e, editor, $img, response) {
      // Do something here.
      context.imagesDescription.push($img[0].currentSrc);
      //context.archeology.setImagesDescription=context.imagesDescription;
    });
    $('#textareaDescription')
      // Catch image remove
      .on('froalaEditor.image.removed', function (e, editor, $img) {
        context.deleteUploadImages('descriptionOne',$img);
      }); 
  }
  ngOnInit() {
    console.log("oixe");
    $('textarea').each(function () {
      this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
    }).on('input', function () {
      this.style.height = (this.scrollHeight) + 'px';
    });
    // Get profile username on page load
    this.authService.getProfile().subscribe(profile => {
      if(!profile.success){
        this.authService.logout();
        this.authGuard.redirectUrl=this.router.url;
        this.router.navigate([this.localizeService.translateRoute('/sign-in-route')]); // Return error and route to login page
      }else{
        this.username = profile.user.username; // Used when creating new category posts and comments
      } 
    });
    //File uploader options
    this.setUploaderOptions();
    //Get thematic
    this.translate.get('create-category.thematic-archeology').subscribe(
    data => {
      //this.archeology.setThematic=data;
    });   
    this.form.get('stage').disable(); // Disable stage field
    this.form.get('municipality').disable(); // Disable municipality field
    this.chargeAllJsonArchives();

  }

}
