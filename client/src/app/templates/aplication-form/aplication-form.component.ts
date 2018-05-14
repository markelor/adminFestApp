import { Component, OnInit,Injectable } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { LocalizeRouterService } from 'localize-router';
import { AuthService } from '../../services/auth.service';
import { AplicationService } from '../../services/aplication.service';
import { TranslateService } from '@ngx-translate/core';
//import { AplicationModalComponent } from './aplication-modal/aplication-modal.component';
import { ModalComponent } from '../../templates/modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ObservableService } from '../../services/observable.service';
import { AlphanumericValidator } from '../../validators';
import { Aplication } from '../../class/aplication';
import { GroupByPipe } from '../../shared/pipes/group-by.pipe';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
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
  selector: 'app-aplication-form',
  templateUrl: './aplication-form.component.html',
  styleUrls: ['./aplication-form.component.css'],
  providers: [{provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}] // define custom NgbDatepickerI18n provider
})
export class AplicationFormComponent implements OnInit {
  private language:string;
  private message;
  private messageClass;
  private subscription: Subscription;
  private submitted:boolean = false;
  private parentCategories;
  private form:FormGroup;
  private title:AbstractControl;
  private entityName:AbstractControl;
  private user:AbstractControl;
  private license:AbstractControl;
  private condition:AbstractControl;
  private price:AbstractControl;
  private expiryDate:AbstractControl;
  private timeExpiryDate = {hour: 13, minute: 30};
  private categories;
  private aplication:Aplication=new Aplication();
  private dtOptions: any = {};
  private dtTrigger: Subject<any> = new Subject();
  private search:boolean=true;
  private usersSearch;
  private selectedUsers=[];
  private conditions=[];
  private searchTerm = new Subject<string>();
  constructor(
    private fb: FormBuilder,
    private localizeService:LocalizeRouterService,
    private aplicationService:AplicationService,
    private authService:AuthService,
    private observableService:ObservableService,
    private modalService: NgbModal,
    private groupByPipe:GroupByPipe,
    private translate: TranslateService){
    this.createForm(); // Create new theme form on start up
    }
    // Function to create new theme form
  private createForm() {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(5),
        AlphanumericValidator.validate
      ])],
      entityName: [''],
      user: [''],
      license: ['', Validators.compose([
        Validators.required/*,DateValidator.validate*/
      ])],
      condition: [''],
      price: ['', Validators.compose([
        Validators.required,
      ])],
      expiryDate: ['', Validators.compose([
        Validators.required/*,DateValidator.validate*/
      ])],
    })
    this.title = this.form.controls['title'];
    this.entityName = this.form.controls['entityName'];
    this.user = this.form.controls['user'];
    this.license= this.form.controls['license'];
    this.condition= this.form.controls['condition'];
    this.price = this.form.controls['price'];
    this.expiryDate=this.form.controls['expiryDate'];
  }
  // Function to disable the registration form
  private disableForm(){
    this.form.disable(); // Disable form
  }
   // Function to enable the registration form
   private enableForm(){
    this.form.enable(); // Enable form
  }
  /*private onSelectedParentCategory(index){
    if(index===-1){
      this.form.controls['expiryDate'].setValue("");
    }else{
      this.category.setLevel=this.parentCategories[index].level+1;
      if(this.parentCategories[index].parentId){
        this.category.setFirstParentId=this.parentCategories[index].firstParentId;
        console.log(this.category.getParentId);
      }else{
        this.category.setFirstParentId=this.parentCategories[index]._id;
      }
    }
  }*/
  private onSubmit(){
    if (this.form.valid) {
      this.submitted = true;
      //this.disableForm();
      this.aplication.setLanguage=this.localizeService.parser.currentLang;
      this.aplication.setUsers=this.selectedUsers;
      this.aplication.setTitle=this.form.get('title').value;
      this.aplication.setEntityName=this.form.get('entityName').value;
      this.aplication.setConditions=this.conditions;
      this.aplication.setLicenseName=this.form.get('license').value;
      this.aplication.setPrice=Number(this.form.get('price').value);
      this.aplication.setExpiredAt=new Date(this.form.get('expiryDate').value.year,this.form.get('expiryDate').value.month,this.form.get('expiryDate').value.day,this.timeExpiryDate.hour,this.timeExpiryDate.minute);
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
          this.usersSearch=[];
          this.conditions=[];
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
  private addUser(index){
    if(this.user.value && !this.selectedUsers.includes(this.user.value)){
      this.selectedUsers.push(this.user.value);
      this.user.setValue("");
    }
  }
  private addCondition(index){
    if(this.condition.value && !this.conditions.includes(this.condition.value)){
      this.conditions.push(this.condition.value);
      this.condition.setValue("");
    }
  }
  private selectUser(index) {
    this.search=false;
    this.user.setValue(this.usersSearch[index].username);
  }
  private onClickOutside() {
    if(this.search){
      this.search=false;
    }
  }
  ngOnInit() {
    this.language=this.localizeService.parser.currentLang;
    $('textarea').each(function () {
      this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
    }).on('input', function () {
      this.style.height = (this.scrollHeight) + 'px';
    });
     this.authService.userSearch(this.searchTerm,this.localizeService.parser.currentLang).subscribe(data=>{
      if(data.success){
        this.usersSearch=data.users;
        this.search=true; 
        console.log(this.usersSearch);
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