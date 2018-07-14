import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { LocalizeRouterService } from 'localize-router';
import { Comment } from '../../class/comment';
import { AuthService } from '../../services/auth.service';
import { CommentService } from '../../services/comment.service';
import { AuthGuard} from '../../pages/guards/auth.guard';
import { ActivatedRoute,Router,NavigationEnd } from '@angular/router';
declare let $: any;
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html'
})
export class CommentComponent implements OnInit {
  private form:FormGroup;
  private comment:AbstractControl;
  private message;
  private messageClass;
  private commentClass:Comment=new Comment();
  private comments;
  private submitted:boolean = false;
  @Input() inputEventId: string;

  constructor(
  private formBuilder:FormBuilder,
  private localizeService: LocalizeRouterService,
  private authService:AuthService,
  private commentService:CommentService,
  private router:Router,
  private activatedRoute: ActivatedRoute,
  private authGuard:AuthGuard
  ) {
    this.createForm();  //Create Angular form when components load
  }
  // Function to create registration form
  private createForm() {
    this.form = this.formBuilder.group({
      // Comment Input
      'comment': ['', Validators.compose([Validators.required,Validators.maxLength(300)])]
    });
    this.comment = this.form.controls['comment'];
  }
  private froalaOptions= {
     fileUpload: false,
     imageUpload: false,
     imageInsertButtons:[],
     videoUpload: false,
     videoInsertButtons:[]
  }
  private initializeFroala(initControls) {
    initControls.initialize();
  }
  private  markdown(string) {
    string = string.replace(/(^|[^@\w])@(\w{1,15})\b/g, '<span class="reply">$2</span>');
    string = string.replace(/\*\*(.+)\*\*/g, '<strong>$1</strong>');
    string = string.replace(/__(.+)__/g, '<strong>$1</strong>');
    string = string.replace(/\*(.+)\*/g, '<em>$1</em>');
    string = string.replace(/_(.+)_/g, '<em>$1</em>');
    string = string.replace(/``(.+)``/g, '<code>$1</code>');
    string = string.replace(/`(.+)`/g, '<code>$1</code>');
    return string;
};

  private addReply(){
  	if (!this.form.get('comment').value) {
        this.form.controls['comment'].setValue('');
    }
  	if(this.form.get('comment').value.search('@' + 'author')===-1){
  		console.log(this.form.get('comment').value[0]);
  		if (this.form.get('comment').value[0] === '@') {
  			console.log("a");
			this.form.controls['comment'].setValue(', '+this.form.get('comment').value);
        } else {
        	console.log("b");
        	this.form.controls['comment'].setValue(' '+this.form.get('comment').value);      
        }
     	this.form.controls['comment'].setValue('@' + 'author' + this.form.get('comment').value);
     	$("#textareaComment").focus();
  	} 

  }
   private onSubmit(){
    if (this.form.valid) {
      // Get authentication to send comment
      this.authService.getAuthentication(this.localizeService.parser.currentLang).subscribe(authentication => {
        if(!authentication.success){
          this.authGuard.redirectUrl=this.router.url;
          this.router.navigate([this.localizeService.translateRoute('/sign-in-route')]); // Return error and route to login page
        }else{
          if(this.form.get('comment').value.match(/(^|[^@\w])@(\w{1,15})\b/)){
              var mentionedUsers = this.form.get('comment').value.replace(/(^|[^@\w])@(\w{1,15})\b/g,'@271$2@272').match(/@271(.*?)@272/g).join().replace(/@271/g,'').replace(/@272/g,'').split(',');
              console.log(mentionedUsers);
          }                                                                                      
          console.log(this.form.get('comment').value);
          var span= this.markdown(this.form.get('comment').value);
          console.log(span)
          this.commentClass.setEventId=this.inputEventId;
          this.commentClass.language=this.localizeService.parser.currentLang;
          this.commentClass.setCreatedBy=this.authService.user.username;
          this.commentClass.setComment=span;
          this.commentClass.setMentionedUsers=mentionedUsers;
          //this.commentClass.setOriginCommentId=
          this.submitted = true;
          // Function to save comment into database
          this.commentService.newComment(this.commentClass).subscribe(data => {
            console.log(data);
            // Check if event was saved to database or not
            if (!data.success) {

              this.submitted = false; // Enable submit button
            } else {
              this.createForm(); // Reset all form fields
              this.submitted = false; // Enable submit button
          
            }
          }); 
        }
      }); 
    }                   
  }     
  

  ngOnInit() {
    this.commentService.getComments(this.inputEventId,this.localizeService.parser.currentLang).subscribe(data => {
      console.log(data);
      // Check if event was saved to database or not
      if (!data.success) {

        this.submitted = false; // Enable submit button
      } else {
        this.createForm(); // Reset all form fields
        this.submitted = false; // Enable submit button
    
      }
    });

  }

}