import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { LocalizeRouterService } from 'localize-router';
import { AuthService } from '../../../services/auth.service';
import { CategoryService } from '../../../services/category.service';
import { TranslateService } from '@ngx-translate/core';
import { CategoryModalComponent } from './category-modal/category-modal.component';
import { ModalComponent } from '../../../templates/modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ObservableService } from '../../../services/observable.service';
import { AlphanumericValidator } from '../../../validators';
import { Category } from '../../../class/category';
import { GroupByPipe } from '../../../shared/pipes/group-by.pipe';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  private language:string;
  private message;
  private messageClass;
  private subscription: Subscription;
  private submitted:boolean = false;
  private parentCategories;
  private form:FormGroup;
  private title:AbstractControl;
  private description:AbstractControl;
  private parentCategory:AbstractControl;
  private categories;
  private category:Category=new Category();
  private dtOptions: any = {};
  private dtTrigger: Subject<any> = new Subject();
  constructor(
    private fb: FormBuilder,
    private localizeService:LocalizeRouterService,
    private categoryService:CategoryService,
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
        Validators.maxLength(35),
        Validators.minLength(3),
        AlphanumericValidator.validate
      ])],
      description: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(200),
        Validators.minLength(5)
      ])],
      parentCategory: [''],
    })
    this.title = this.form.controls['title'];
    this.description= this.form.controls['description'];
    this.parentCategory=this.form.controls['parentCategory']
  }
  // Function to disable the registration form
  private disableForm(){
    this.form.disable(); // Disable form
  }
   // Function to enable the registration form
   private enableForm(){
    this.form.enable(); // Enable form
  }
  private onSelectedParentCategory(index){
    if(index===-1){
      this.form.controls['parentCategory'].setValue("");
    }else{
      this.category.setLevel=this.parentCategories[index].level+1;
      if(this.parentCategories[index].parentId){
        this.category.setFirstParentId=this.parentCategories[index].firstParentId;
        console.log(this.category.getParentId);
      }else{
        this.category.setFirstParentId=this.parentCategories[index]._id;
      }
    }
  }
  private onSubmit(){
    if (this.form.valid) {
      this.submitted = true;
      //this.disableForm();
      this.category.setLanguage=this.localizeService.parser.currentLang,
      this.category.setParentId=this.form.get('parentCategory').value;
      this.category.setTitle=this.form.get('title').value;
      this.category.setDescription=this.form.get('description').value;
      this.category.setCreatedAt=new Date();
      this.category.setCreatedAt=new Date();
      console.log(this.form.get('parentCategory').value);
      this.categoryService.newCategory(this.category).subscribe(data=>{
        if(!data.success){
          this.messageClass='alert alert-danger ks-solid';
          this.message=data.message
          this.enableForm();
        }else{
          this.submitted = false;
          this.category=new Category();
          this.getAllCategories();
          this.createForm(); // Reset all form fields
          this.messageClass='alert alert-success ks-solid'
          this.message=data.message
        }
      });
    }   
  }
  private categoryStaticModalShow(category) {
    const activeModal = this.modalService.open(CategoryModalComponent, {size: 'sm',backdrop: 'static'});
    activeModal.componentInstance.oldCategory = category;
    activeModal.componentInstance.oldParentCategories = this.parentCategories;

  }
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
      this.categoryStaticModalShow(category);
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
  private categoryDeleteClick(index,category): void {
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
  }
  ngOnInit() {
    this.language=this.localizeService.parser.currentLang;
    $('textarea').each(function () {
      this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
    }).on('input', function () {
      this.style.height = (this.scrollHeight) + 'px';
    });
    this.createSettings(); 
    this.getAllCategories();
  	/*this.authService.getAllCategorys(this.localizeService.parser.currentLang).subscribe(data=>{
      if(data.success){
        if(data.permission==="admin" || data.permission==="moderator"){
          this.getAllThemes(); 	     
        }       
      }     
    });*/     	  
  }
}



