import { Component, OnInit,Injectable } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { LocalizeRouterService } from 'localize-router';
import { AuthService } from '../../../services/auth.service';
import { CategoryService } from '../../../services/category.service';
import { TranslateService } from '@ngx-translate/core';
import { AplicationModalComponent } from './aplication-modal/aplication-modal.component';
import { ModalComponent } from '../../../templates/modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ObservableService } from '../../../services/observable.service';
import { AlphanumericValidator } from '../../../validators';
import { Category } from '../../../class/category';
import { GroupByPipe } from '../../../shared/pipes/group-by.pipe';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
@Component({
  selector: 'app-create-aplication',
  templateUrl: './create-aplication.component.html',
  styleUrls: ['./create-aplication.component.css']
})
export class CreateAplicationComponent implements OnInit {
  private language:string;
  private message;
  private messageClass;
  private subscription: Subscription;
  private submitted:boolean = false;
  private parentCategories;
  private form:FormGroup;
  private user:AbstractControl;
  private event:AbstractControl;
  private license:AbstractControl;
  private expiryDate:AbstractControl;
  private timeExpiryDate = {hour: 13, minute: 30};
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
    }
   
  ngOnInit() {
    this.language=this.localizeService.parser.currentLang;
    $('textarea').each(function () {
      this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
    }).on('input', function () {
      this.style.height = (this.scrollHeight) + 'px';
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



