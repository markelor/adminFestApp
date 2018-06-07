import { Component, OnInit, ViewChild, Input} from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { LocalizeRouterService } from 'localize-router';
import { AuthService } from '../../../services/auth.service';
import { CategoryService } from '../../../services/category.service';
import { ObservableService } from '../../../services/observable.service';
import { TranslateService,LangChangeEvent } from '@ngx-translate/core';
import { AlphanumericValidator } from '../../../validators';
import { Category } from '../../../class/category';
import { GroupByPipe } from '../../../shared/pipes/group-by.pipe';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  private message;
  private messageClass;
  private submitted:boolean = false;
  private form:FormGroup;
  @Input() inputOperation:string;
  @Input() inputCategory;
  @Input() inputParentCategories;
  @Input() inputLanguage;
  private title:AbstractControl;
  private description:AbstractControl;
  private parentCategory:AbstractControl;
  private categories;
  private category:Category=new Category();
  private subscriptionObservable: Subscription;
  constructor(
    private fb: FormBuilder,
    private localizeService:LocalizeRouterService,
    private categoryService:CategoryService,
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
      parentCategory: [''],
    })
    this.title = this.form.controls['title'];
    this.description= this.form.controls['description'];
    this.parentCategory=this.form.controls['parentCategory']
  }
  private initializeForm(){  
    if(this.inputCategory){
      if(this.inputCategory.parentId){
        this.form.controls['parentCategory'].setValue(this.inputCategory.parentId);
      }else{
        this.form.controls['parentCategory'].setValue('');
      }
      var hasTranslation=false;

      for (var i = 0; i < this.inputCategory.translation.length; ++i) {
        if(this.inputCategory.translation[i].language===this.inputLanguage){
          hasTranslation=true;
          this.form.controls['title'].setValue(this.inputCategory.translation[i].title);
          this.form.controls['description'].setValue(this.inputCategory.translation[i].description);  
        }
      }
      if(!hasTranslation){
        if(this.inputCategory.language===this.inputLanguage){ 
          this.form.controls['title'].setValue(this.inputCategory.title);
          this.form.controls['description'].setValue(this.inputCategory.description);      
        }
      }  
    }     
  }
  private observableEdit(){
    this.subscriptionObservable=this.observableService.notifyObservable.subscribe(res => {
      this.subscriptionObservable.unsubscribe();
      if (res.hasOwnProperty('option') && res.option === 'modal-edit-category') {
        if(this.inputCategory && res.language===this.inputLanguage){
          var hasTranslation=false;
          this.inputCategory.parentId=this.form.get('parentCategory').value;
          for (var i = 0; i < this.inputCategory.translation.length; ++i) {
            if(this.inputCategory.translation[i].language===this.inputLanguage){
              hasTranslation=true;
              this.inputCategory.translation[i].language=this.inputLanguage;
              this.inputCategory.translation[i].title=this.form.get('title').value;
              this.inputCategory.translation[i].description=this.form.get('description').value;
            }
          }
          if(!hasTranslation){
            if(this.inputCategory.language===this.inputLanguage){
              this.inputCategory.language=this.inputLanguage,        
              this.inputCategory.title=this.form.get('title').value;
              this.inputCategory.description=this.form.get('description').value;
            }else{
              var translationObj={
                language:this.inputLanguage,
                title:this.form.get('title').value,
                description:this.form.get('description').value
              }
              this.inputCategory.translation.push(translationObj);             
            }
          }
          this.categoryService.editCategory(this.inputCategory).subscribe(data=>{
            if(data.success){
              this.observableService.modalType="modal-edit-category-success";
              this.observableService.notifyOther({option: this.observableService.modalType,category:this.inputCategory});
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
  private onSelectedParentCategory(index){
    if(index===-1){
      this.form.controls['parentCategory'].setValue("");
    }else{
      this.category.setLevel=this.inputParentCategories[index].level+1;
      this.inputCategory.level=this.inputParentCategories[index].level+1;
      if(this.inputParentCategories[index].parentId){
        this.category.setFirstParentId=this.inputParentCategories[index].firstParentId;
        this.inputCategory.setFirstParentId=this.inputParentCategories[index].firstParentId;
      }else{
        this.inputCategory.setFirstParentId=this.inputParentCategories[index]._id;
        this.inputCategory.setFirstParentId=this.inputParentCategories[index]._id;
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
      this.categoryService.newCategory(this.category).subscribe(data=>{
        if(!data.success){
          this.messageClass='alert alert-danger ks-solid';
          this.message=data.message
          this.enableForm();
        }else{
          this.observableService.modalType="modal-edit-category-success";
          this.observableService.notifyOther({option: this.observableService.modalType});
          this.submitted = false;
          this.category=new Category();
          this.createForm(); // Reset all form fields
          this.messageClass='alert alert-success ks-solid'
          this.message=data.message
        }
      });
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
  }
}
