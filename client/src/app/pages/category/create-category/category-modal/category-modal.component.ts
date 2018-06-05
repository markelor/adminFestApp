import { Component, OnInit,Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ObservableService } from '../../../../services/observable.service';
import { AuthService } from '../../../../services/auth.service';
import { CategoryService } from '../../../../services/category.service';
import { LocalizeRouterService } from 'localize-router';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.css']
})
export class CategoryModalComponent implements OnInit {
  private language:string;
  private message;
  private messageClass;
  private submitted:boolean = false;
  private parentCategories;
  @Input() inputCategory;
  @Input() inputParentCategories;
  constructor(
  	private localizeService:LocalizeRouterService,
    private activeModal: NgbActiveModal,
    private authService: AuthService,
    private categoryService: CategoryService,
    private observableService: ObservableService,
    private translate: TranslateService){
    }
  public closeModal() {
    this.activeModal.close();
    this.observableService.modalCount=this.observableService.modalCount-1;

  }
  
  public cancelModal(){
    this.closeModal();

  }
  public confirmModal() {
  	this.observableService.modalType="modal-edit-category";
    this.observableService.notifyOther({option: this.observableService.modalType});
    this.closeModal();
  }

  ngOnInit() {
    setTimeout(() => {
      $(".nav-"+this.localizeService.parser.currentLang).addClass('active');
      $( ".nav-"+this.localizeService.parser.currentLang).click ();
    }, 0); 
  	this.observableService.modalCount=this.observableService.modalCount+1;
  }
}
