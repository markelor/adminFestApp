
import { Component, OnInit,ElementRef,Injectable,Input } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder,FormArray, Validators } from '@angular/forms';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { AlphanumericValidator,LatitudeValidator,LongitudeValidator,DateValidator } from '../../../validators';
import { AuthService } from '../../../services/auth.service';
import { CategoryService } from '../../../services/category.service';
import { EventService } from '../../../services/event.service';
import { FileUploaderService} from '../../../services/file-uploader.service';
import { TranslateService } from '@ngx-translate/core';
import { FileUploader,FileUploaderOptions,FileItem } from 'ng2-file-upload';
import { Router } from '@angular/router';
import { Event } from '../../../class/event';
import { Place } from '../../../class/place';
import { LocalizeRouterService } from 'localize-router';
import { ObservableService } from '../../../services/observable.service';
import { GroupByPipe } from '../../../shared/pipes/group-by.pipe';
import { AuthGuard} from '../../../pages/guards/auth.guard';
import * as moment from 'moment';
declare let $: any;
const URL = 'http://localhost:8080/fileUploader/uploadImages/poster';
const I18N_VALUES = {
  'eu': {
    weekdays: ['As', 'As', 'As', 'Os', 'Os', 'La', 'Ig'],
    months: ['Urt','Ots','Mar','Api','Mai','Eka','Uzt','Abu','Ira','Urr','Aza','Abe'],
  },
  'es': {
    weekdays: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Dom'],
    months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  },
  'en': {
    weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  }
  // other languages you would support
};

// Define a service holding the language. You probably already have one if your app is i18ned. Or you could also
// use the Angular LOCALE_ID value
// Define custom service providing the months and weekdays translations
@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

  constructor(
    private localizeService: LocalizeRouterService) {
    super();
  }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this.localizeService.parser.currentLang].weekdays[weekday - 1];
  }
  getMonthShortName(month: number): string {
    return I18N_VALUES[this.localizeService.parser.currentLang].months[month - 1];
  }
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }
}
@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css'],
  providers: [{provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}] // define custom NgbDatepickerI18n provider
})
export class EventFormComponent implements OnInit {
  private event:Event=new Event();
  private place:Place=new Place();
  private messageClass;
  private message;
  //private newPost = false;
  private loadingEvents = false;
  private form:FormGroup;
  private submitted:boolean = false;
  private username;
  private imagesPoster=[];
  @Input() editImagesPoster;
  private imagesDescription=[];
  @Input() editImagesDescription;
  @Input() id:string;
  @Input() createdBy:string;
  @Input() editTitle:string;
  private title:AbstractControl;
  private categories: any[] = [];
  @Input() editCategories;
  private province:AbstractControl;
  @Input() editProvince;
  private municipality:AbstractControl;
  @Input() editMunicipality;
  private participant:AbstractControl;
  @Input() editParticipants;
  private start:AbstractControl;
  @Input() editStart:string;
  private end:AbstractControl;
  @Input() editEnd:string;
  private location:AbstractControl;
  @Input() editLocation:string;
  private lat:AbstractControl;
  @Input() editLat:string;
  private lng:AbstractControl;
  @Input() editLng:string;
  private description:AbstractControl;
  @Input() editDescription:string;
  private observations:AbstractControl;
  @Input() editObservations:string;
  @Input() operation:string;
  private timeStart = {hour: 13, minute: 30};
  private timeEnd = {hour: 13, minute: 30};
  private categoryId=[];
  private levelCategories=[];
  private participants=[];
  private provincesEvent;
  private countrysArcheology;
  private regionsArcheology;
  private municipalitiesEvent;
  private uploadAllSuccess:Boolean=true;
  private froalaSignature;
  private froalaEvent;
  private uploader:FileUploader = new FileUploader({
    url: URL,itemAlias: 'poster',
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
    private categoryService: CategoryService,
    private eventService: EventService,
    private fileUploaderService:FileUploaderService,
    private translate: TranslateService,
    private observableService: ObservableService,
    private router:Router,
    private elementRef: ElementRef,
    private localizeService: LocalizeRouterService,
    private authGuard: AuthGuard,
    private groupByPipe:GroupByPipe
  ) {
    this.createNewEventForm(); // Create new event form on start up
  }
  private createItem(value) {
    return this.fb.group({
      category: [value, Validators.compose([
        Validators.required
      ])],
    });
  }

  // Function to create new event form
  private createNewEventForm() {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(5),
        AlphanumericValidator.validate
      ])],
      categories: this.fb.array([ this.createItem('') ]),
      province: ['', Validators.compose([
        Validators.required
      ])],
      municipality: ['', Validators.compose([
        Validators.required
      ])],
      participant: ['', Validators.compose([
        /*Validators.maxLength(30),
        Validators.minLength(5),
        AlphanumericValidator.validate*/
      ])],
      start: ['', Validators.compose([
        Validators.required/*,DateValidator.validate*/
      ])],
      end: ['', Validators.compose([
        Validators.required/*,DateValidator.validate*/
      ])],
      location: ['', Validators.compose([
        Validators.maxLength(1000)
      ])],
       lat: ['', Validators.compose([
        Validators.required,LatitudeValidator.validate
      ])],
      lng: ['', Validators.compose([
        Validators.required,LongitudeValidator.validate
      ])],
      description: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(20000),
        Validators.minLength(50)
      ])],
      observations: ['', Validators.compose([
        Validators.maxLength(1000)
      ])]

    })
    this.title = this.form.controls['title'];
    this.participant = this.form.controls['participant'];
    this.province = this.form.controls['province'];
    this.municipality = this.form.controls['municipality'];
    this.start = this.form.controls['start'];
    this.end = this.form.controls['end'];
    this.location = this.form.controls['location'];
    this.lat = this.form.controls['lat'];
    this.lng = this.form.controls['lng'];
    this.description= this.form.controls['description'];
    this.observations = this.form.controls['observations'];
  }
  private initializeForm(){
    if(this.id)
      this.event.setId=this.id;
     if(this.createdBy)
      this.event.setCreatedBy=this.createdBy;
  	if(this.editTitle)
      this.title.setValue(this.editTitle);
    if(this.editCategories){
      (this.form.controls['categories'] as FormArray).removeAt(0);
      for (var i in this.editCategories) {
        this.categoryId.push(this.editCategories[i]._id);
       (this.form.controls['categories'] as FormArray).push(this.createItem(this.editCategories[i].title));
      } 
    }
    if(this.editParticipants)
      this.participants=this.editParticipants;
  	if(this.editProvince){
      this.province.setValue(this.editProvince.name);
      this.place.setGeonameIdProvince=this.editProvince.geonameId;
    }
    if(this.editMunicipality){
      this.eventService.getEventGeonamesJson('municipality',this.localizeService.parser.currentLang,this.editProvince.name.toLowerCase()).subscribe(municipalitiesEvent => {
        this.municipalitiesEvent=municipalitiesEvent.geonames;
        this.municipality.setValue(this.editMunicipality.name);
        this.place.setGeonameIdMunicipality=this.editMunicipality.geonameId;
        this.form.get('municipality').enable(); // Enable municipality field
      });
    }
    if(this.editStart){
      var year=Number(this.editStart.split("-")[0]);
      var month=Number(this.editStart.split("-")[1]);
      var day=Number(this.editStart.split('-').pop().split('T').shift());
      var hour=Number(this.editStart.split('T').pop().split(':').shift());
      var minute=Number(this.editStart.split(':')[1]);
      var calendar= {year:year , month: month,day: day};
      this.start.setValue(calendar);
      this.timeStart.hour=hour;
      this.timeStart.minute=minute; 
    }     
    if(this.editEnd){
       var year=Number(this.editEnd.split("-")[0]);
      var month=Number(this.editEnd.split("-")[1]);
      var day=Number(this.editEnd.split('-').pop().split('T').shift());
      var hour=Number(this.editEnd.split('T').pop().split(':').shift());
      var minute=Number(this.editEnd.split(':')[1]);
      var calendar= {year:year , month: month,day: day};
      this.end.setValue(calendar); 
      this.timeEnd.hour=hour;
      this.timeEnd.minute=minute; 
    }
    
    if(this.editLocation)
      this.location.setValue(this.editLocation);
    if(this.editLat)
      this.lat.setValue(this.editLat);
    if(this.editLng)
      this.lng.setValue(this.editLng);
    if(this.editDescription)
      this.description.setValue(this.editDescription);
  	if(this.editObservations)
      this.observations.setValue(this.editObservations);
    if(this.editImagesPoster){
      this.imagesPoster=this.editImagesPoster;
      for (var j = 0; j < this.editImagesPoster.length; ++j) {
        let file = new File([],decodeURIComponent(this.editImagesPoster[j].url).split('https://s3.eu-west-1.amazonaws.com/culture-bucket/poster/')[1], {type: this.editImagesPoster[j].mimetype, lastModified: Date.now()});
        let fileItem = new FileItem(this.uploader, file, {});
        fileItem.file.size=this.editImagesPoster[j].size;
        fileItem.progress = 100;
        fileItem.isUploaded = true;
        fileItem.isSuccess = true;
        this.uploader.queue.push(fileItem);
      }
    }
    if(this.editImagesDescription){
      this.imagesDescription=this.editImagesDescription;
      console.log(this.editImagesDescription);
      //this.observations.setValue(this.editIma);
    }
    if(this.editTitle && this.categoryId.length>0 && this.editLat && this.editLng){
      // After 2 seconds, redirect to dashboard page
      setTimeout(() => {
        this.passCoordinates(undefined);
      },0);
      
    }    
  }
  // Enable new categories form
  private enableFormNewEventForm() {
    this.form.enable(); // Enable form
    $('#textareaDescription').froalaEditor('edit.on');
    this.froalaEvent.getEditor()('html.set', '');
  }

  // Disable new categories form
  private disableFormNewEventForm() {
    this.form.disable(); // Disable form
    $('#textareaDescription').froalaEditor('edit.off');
  }

  // Function to display new categories form
  /*private newEventForm() {
    this.newPost = true; // Show new categories form
  }*/

  private fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
   // File upload controll
  private fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
  private onEventSubmit(){
    // Create event object from form fields
    this.event.setLanguage=this.localizeService.parser.currentLang;// Language field
    this.event.setCreatedBy=this.username; // CreatedBy field
    this.event.setTitle=this.form.get('title').value; // Title field
    this.event.setParticipants=this.participants;
    this.event.setStart=new Date(this.form.get('start').value.year,this.form.get('start').value.month,this.form.get('start').value.day,this.timeStart.hour,this.timeStart.minute);
    this.event.setEnd=new Date(this.form.get('end').value.year,this.form.get('end').value.month,this.form.get('end').value.day,this.timeEnd.hour,this.timeEnd.minute);
    this.event.setCategoryId=this.categoryId[this.categoryId.length-1];
    this.event.setDescription= this.form.get('description').value; // Description field
    this.event.setObservations=this.form.get('observations').value; // Observations field
    this.place.setProvince=this.form.get('province').value; // Province field
    this.place.setMunicipality=this.form.get('municipality').value; // Municipality field
    this.place.setLocation=this.form.get('location').value; //Location field,
    this.place.setLat=Number(this.form.get('lat').value); // Lat field
    this.place.setLng=Number(this.form.get('lng').value); // Lng field
    if(this.uploader.queue.length>0){
      this.submitted = false; // Disable submit button
      //this.disableFormNewEventForm(); // Lock form
      this.uploader.uploadAll();
      if(this.uploader.queue[0].isUploaded){
        this.editEvent();
      }
    }else{
      if(this.operation==='create'){
        this.createEvent();
      }else if(this.operation==='edit'){
        this.editEvent();
      }      
    }
  }

  private createEvent() {
    // Function to save event into database
    this.eventService.newEvent(this.event,this.place).subscribe(data => {
      this.submitted = true;
      // Check if event was saved to database or not
      if (!data.success) {
        this.deleteUploadImages('poster',this.imagesPoster);
        this.deleteUploadImages('descriptionAll',this.imagesDescription);
        this.messageClass = 'alert alert-danger ks-solid'; // Return error class
        this.message = data.message; // Return error message
        this.submitted = false; // Enable submit button
        this.enableFormNewEventForm(); // Enable form
      } else {
        this.createNewEventForm(); // Reset all form fields
        this.messageClass = 'alert alert-success ks-solid'; // Return success class
        this.message = data.message; // Return success message
        // Clear form data after two seconds
        setTimeout(() => {
          //this.newPost = false; // Hide form
          this.submitted = false; // Enable submit button
          this.message = false; // Erase error/success message
          this.uploader.clearQueue()//Reset uploader
          this.enableFormNewEventForm(); // Enable the form fields
          this.participants=[];
        }, 2000);
      }
    });  
  }
  private editEvent() {
    // Function to save event into database
    this.eventService.editEvent(this.event,this.place).subscribe(data => {
      console.log(data);
      /*console.log(data);
      // Check if event was saved to database or not
      if (!data.success) {
        this.deleteUploadImages('poster',this.imagesPoster);
        this.deleteUploadImages('descriptionAll',this.imagesDescription);
        this.messageClass = 'alert alert-danger ks-solid'; // Return error class
        this.message = data.message; // Return error message
        this.submitted = true; // Enable submit button
        this.enableFormNewEventForm(); // Enable form
      } else {
        this.createNewEventForm(); // Reset all form fields
        this.messageClass = 'alert alert-success ks-solid'; // Return success class
        this.message = data.message; // Return success message
        // Clear form data after two seconds
        setTimeout(() => {
          //this.newPost = false; // Hide form
          this.submitted = false; // Enable submit button
          this.message = false; // Erase error/success message
          this.uploader.clearQueue()//Reset uploader
          this.enableFormNewEventForm(); // Enable the form fields
        }, 2000);
      }*/
    });  
  }
  private deleteUploadImages(type,images){
    if(type==='poster'){
      for (var i = 0; i < images.length; ++i) {
        this.fileUploaderService.deleteImages(images[i].key,"poster",this.localizeService.parser.currentLang).subscribe(data=>{
        });
      }
    }else if(type==='descriptionOne'){
      var currentUrlSplit = images[0].currentSrc.split("/");
      let imageName = currentUrlSplit[currentUrlSplit.length - 1];
      var urlSplit = imageName.split("%2F");
      for (var i = 0; i < this.imagesDescription.length; i++) {
        if(this.imagesDescription[i]===images[0].currentSrc){
          this.imagesDescription.splice(i,1);
          this.event.setImagesDescription=this.imagesDescription;
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
    // Function on seleccted categories
  private onSelectedCategory(index,level){
    if (index===-1){
      // remove
        for (var i = this.form.controls['categories'].value.length - 1; i >= level+1; i--) {
          (this.form.controls['categories'] as FormArray).removeAt(i);
        }
    }else{
      //hide categories
      this.categoryId[level+1] = this.levelCategories[level].value[index]._id;
      var newFormArray=false;
      if(this.levelCategories[level+1]){
         for (var i = 0; i < this.levelCategories[level+1].value.length; ++i) {
          if(this.levelCategories[level+1].value[i].parentId===this.levelCategories[level].value[index]._id){
            newFormArray=true;
          }
        }
      }     
      if((this.form.controls['categories'].value.length-1 <= level) && newFormArray===true){
        (this.form.controls['categories'] as FormArray).push(this.createItem(''));
      }else {
        // remove
        for (var i = this.form.controls['categories'].value.length - 1; i >= level+1; i--) {
          (this.form.controls['categories'] as FormArray).removeAt(i);
        }
        if(newFormArray){
         (this.form.controls['categories'] as FormArray).push(this.createItem('')); 
        }       
      }    
    }
  }   
  // Function on seleccted event Continent
  private onSelectedProvince(index){
    if (index===-1){
      this.form.get('municipality').disable(); // Disable municipality field
    }else{
      this.form.get('municipality').enable(); // Enable municipality field
      this.eventService.getEventGeonamesJson('municipality',this.localizeService.parser.currentLang,this.provincesEvent[index].toponymName.toLowerCase()).subscribe(municipalitiesEvent => {
        this.place.setGeonameIdProvince=this.provincesEvent[index].geonameId;
        this.municipalitiesEvent=municipalitiesEvent.geonames;
      });
    }
    this.form.controls['municipality'].setValue("");
  }
  // Function on seleccted event province
  private onSelectedMunicipality(index){
    if(index!==-1){
      var coordinates={
        lat:this.municipalitiesEvent[index].lat,
        lng:this.municipalitiesEvent[index].lng
      }
      this.passCoordinates(coordinates);
      this.place.setGeonameIdMunicipality=this.municipalitiesEvent[index].geonameId;
    }
  }
  private chargeAll(){
    //First category parentId null on initialize
    this.categoryId.splice(0, 0, null);
    //Get categories
    this.categoryService.getCategories(this.localizeService.parser.currentLang).subscribe(data=>{
      if(data.success){
        this.levelCategories=this.groupByPipe.transform(data.categories,'level');
      }   
    });
    //Get continents on page load
    this.eventService.getEventGeonamesJson('province',this.localizeService.parser.currentLang,'euskal-herria').subscribe(provincesEvent => {
      this.provincesEvent=provincesEvent.geonames;
    });
  }
  private passCoordinates(defaultCoordinates){
    if (defaultCoordinates){
      var market_info={
        title:this.form.get('title').value,
        category:this.form.get('categories').value[this.form.get('categories').value.length-1].category, // Event field
        lat:defaultCoordinates.lat, // Lat field
        lng:defaultCoordinates.lng, // Lng field
      }
      this.lat.setValue(defaultCoordinates.lat);
      this.lng.setValue(defaultCoordinates.lng);
    }else{
      var market_info={
        title:this.form.get('title').value,
        category:this.form.get('categories').value[this.form.get('categories').value.length-1].category, // Event field
        lat:this.form.get('lat').value, // Lat field
        lng:this.form.get('lng').value, // Lng field
      }
    }  
    this.observableService.mapType="create-categories-coordinates";
    this.observableService.notifyOther({option: this.observableService.mapType, value: market_info});
  }
  private setUploaderOptions(){
    const authHeader: Array<{
     name: string;
     value: string;
     }> = [];
     authHeader.push({name: 'Authorization' , value: 'Bearer '+this.authService.authToken});
    this.uploadOptions = <FileUploaderOptions>{headers : authHeader};
    this.uploader.setOptions(this.uploadOptions);
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file)=> { 
         console.log(this.uploader);
      file.withCredentials = false;
      if(this.uploader.queue.length>1){
        this.uploader.queue.splice(0,1);
      }
    };
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
        this.enableFormNewEventForm(); // Enable form
      }else{
        var file={
          size:responseJson.file[0].size,
          url:responseJson.file[0].location
        }
        this.imagesPoster.push(file);   
        if(this.uploader.progress===100 && this.uploadAllSuccess){
          this.event.setImagesPoster=this.imagesPoster;
          if(this.operation==='create'){
            this.createEvent();
          }else if(this.operation==='edit'){
            this.editEvent();
          }
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
  private initializeFroala(initControls) {
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
      context.event.setImagesDescription=context.imagesDescription;
    });
    $('#textareaDescription')
      // Catch image remove
      .on('froalaEditor.image.removed', function (e, editor, $img) {
        context.deleteUploadImages('descriptionOne',$img);
      }); 
  }
  private addParticipant() {
      if(this.participant.value && !this.participants.includes(this.participant.value)){
        this.participants.push(this.participant.value);
        this.participant.setValue("");
      }
    }
  ngOnInit() {
  	this.initializeForm();
    $('textarea').each(function () {
      this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
    }).on('input', function () {
      this.style.height = (this.scrollHeight) + 'px';
    });
    // Get profile username on page load
    this.authService.getAuthentication(this.localizeService.parser.currentLang).subscribe(authentication => {
      if(!authentication.success){
        this.authService.logout();
        this.authGuard.redirectUrl=this.router.url;
        this.router.navigate([this.localizeService.translateRoute('/sign-in-route')]); // Return error and route to login page
      }else{
        this.username = authentication.user.username; // Used when creating new categories posts and comments
      } 
    });
    //File uploader options
    this.setUploaderOptions();
    this.form.get('municipality').disable(); // Disable municipality field
    this.chargeAll();
  }
}
