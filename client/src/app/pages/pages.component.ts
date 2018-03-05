import { Component, OnInit } from '@angular/core';
import { LocalizeRouterService } from 'localize-router';
import { AuthService } from'../services/auth.service';
import { ObservableService } from'../services/observable.service';
import { ModalComponent } from '../templates/modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent implements OnInit {
  private subscription: Subscription;	
  constructor(private localizeService:LocalizeRouterService,private authService:AuthService,private observableService:ObservableService, private modalService: NgbModal) { }
  private staticModalShow() {
    this.observableService.modalType='modal-renew-session';
  	const activeModal = this.modalService.open(ModalComponent, {size: 'sm',backdrop: 'static'});
    activeModal.componentInstance.modalHeader = 'Modal renew sesion';
    activeModal.componentInstance.modalContent = `This is static modal, backdrop click
 will not close it. Click × or confirmation button to close modal.`;
  }

  // Function to check if e-mail is taken
  private checkSesionFirstTime() {
    if(this.authService.authToken){
      const parseJwt = function(token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
      };
      var expireTime = parseJwt(this.authService.authToken); // Save parsed token into variable
      var timeStamp=Math.floor(Date.now()/1000)
      console.log(expireTime.exp);
      console.log(timeStamp);
      var timeCheck=expireTime.exp-timeStamp;
      console.log(timeCheck);
      if(timeCheck<=120){
        //this.staticModalShow();
        console.log("token has expired");
        
      }else{
        console.log("token not yet expired");
      }
    }
  }
  // Function to check if e-mail is taken
  private checkSesion() {
    if(this.authService.loggedIn()){
      this.authService.loadToken();
      this.authService.loadUser();
      this.checkSesionFirstTime();
      // After 2 seconds, see if session is expired
          const interval=setInterval(() => {
          console.log("test");
          console.log(this.authService.authToken);
          if(!this.authService.authToken){
            clearInterval(interval);
          }else{
            const parseJwt = function(token) {
              var base64Url = token.split('.')[1];
              var base64 = base64Url.replace('-', '+').replace('_', '/');
              return JSON.parse(window.atob(base64));
            };
            var expireTime = parseJwt(this.authService.authToken); // Save parsed token into variable
            var timeStamp=Math.floor(Date.now()/1000)
            console.log(expireTime.exp);
            console.log(timeStamp);
            var timeCheck=expireTime.exp-timeStamp;
            console.log(timeCheck);
            if(timeCheck<=120){
              if(this.observableService.modalCount<1){
                this.staticModalShow();
                this.subscription=this.observableService.notifyObservable.subscribe(res => {
                if (res.hasOwnProperty('option') && res.option === 'modal-renew-session') {
                  this.subscription.unsubscribe();
                  this.authService.renewSession(this.authService.user.username,this.localizeService.parser.currentLang).subscribe(data => {
                    console.log(data);
                    if (data.success) {
                       this.authService.storeUserData(data.token,{username: this.authService.user.username}); // Username input field        
                    }
                  });
             
                }else{

                }
              });
              console.log("token has expired");
              clearInterval(interval);

              }          
            }else{
              console.log("token not yet expired");
            }
          }
        }, 60000);

    }else{

    }
    
  }	
  ngOnInit() {
  	//check if session is expired
    this.checkSesion();
  }

}
