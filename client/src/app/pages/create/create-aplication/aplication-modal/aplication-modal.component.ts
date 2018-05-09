import { Component, OnInit,Input } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AlphanumericValidator } from '../../../../validators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ObservableService } from '../../../../services/observable.service';
import { AuthService } from '../../../../services/auth.service';
import { CategoryService } from '../../../../services/category.service';
import { LocalizeRouterService } from 'localize-router';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-aplication-modal',
  templateUrl: './aplication-modal.component.html',
  styleUrls: ['./aplication-modal.component.css']
})
export class AplicationModalComponent implements OnInit {
  private language:string;
  private message;
  private messageClass;
  private submitted:boolean = false;
  private parentCategories;
  private form:FormGroup;
  private title:AbstractControl;
  private description:AbstractControl;
  private parentCategory:AbstractControl;
  @Input() oldCategory;
  @Input() oldParentCategories;
  constructor(
  	private localizeService:LocalizeRouterService,
    private formBuilder:FormBuilder,
    private activeModal: NgbActiveModal,
    private authService: AuthService,
    private categoryService: CategoryService,
    private observableService: ObservableService,
    private translate: TranslateService){
    this.createForm(); // Create new theme form on start up
    }
    // Function to create new theme form
  private createForm() {
    this.form = this.formBuilder.group({
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
      this.oldCategory.setLevel=this.parentCategories[index].level+1;
      if(this.parentCategories[index].parentId){
        this.oldCategory.setFirstParentId=this.parentCategories[index].firstParentId;
        console.log(this.oldCategory.getParentId);
      }else{
        this.oldCategory.setFirstParentId=this.parentCategories[index]._id;
      }
    }
  }

  public closeModal() {
    this.activeModal.close();
    this.observableService.modalCount=this.observableService.modalCount-1;

  }
  
  public cancelModal(){
    this.closeModal();

  }
  public confirmModal() {
  	this.oldCategory.language=this.localizeService.parser.currentLang,
	this.oldCategory.parentId=this.form.get('parentCategory').value;
	this.oldCategory.title=this.form.get('title').value;
	this.oldCategory.description=this.form.get('description').value;
	this.oldCategory.createdAt=new Date();
	this.oldCategory.createdAt=new Date();
  	
  	this.categoryService.editCategory(this.oldCategory).subscribe(data=>{
  	this.observableService.notifyOther({option: this.observableService.modalType,data:data});
    });
    this.closeModal();
  }

  ngOnInit() {
  	console.log(this.oldCategory);
  	this.observableService.modalCount=this.observableService.modalCount+1;
  	if(this.oldCategory.parentId){
  		this.form.controls['parentCategory'].setValue(this.oldCategory.parentId);
  	}else{
  		this.form.controls['parentCategory'].setValue('');
  	}
  	
    this.form.controls['title'].setValue(this.oldCategory.title);
    this.form.controls['description'].setValue(this.oldCategory.description);   
  }

}
