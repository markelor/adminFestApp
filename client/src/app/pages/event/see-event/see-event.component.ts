import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { EventService } from '../../../services/event.service';
import { ObservableService } from '../../../services/observable.service';
import { TranslateService } from '@ngx-translate/core';
import { LocalizeRouterService } from 'localize-router';
import { AuthGuard} from '../../guards/auth.guard';
import { ActivatedRoute,Router,NavigationEnd } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-see-event',
  templateUrl: './see-event.component.html',
  styleUrls: ['./see-event.component.css']
})
export class SeeEventComponent implements OnInit {
  private event;
  private categories;
  private galleryOptions: NgxGalleryOptions[];
  private galleryImages: NgxGalleryImage[];
  constructor(
    private authService:AuthService,
    private eventService:EventService,
    private observableService:ObservableService,
    private localizeService:LocalizeRouterService,
    private translate:TranslateService,
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private authGuard:AuthGuard) { }
  private initializeGalleryOptions(){
    this.galleryOptions = [
      { thumbnails: false },
      { breakpoint: 500, "width": "100%", "height": "100%" }
      
  ];

  }
  private initializeGalleryImages(images){
    this.galleryImages = [
      {
          small: images[0].url,
          medium:images[0].url ,
          big: images[0].url
      }
    ];      
  }
  /*private addReaction(reaction){
    this.themeService.addReactionTheme(this.bindContent.transform(this.archeologyDetail,this.language,'_id',undefined),reaction,this.localizeService.parser.currentLang).subscribe(data=>{
      if(data.success){
        this.getSingleTheme();
      }else{
        if(data.authentication===false){
          this.authService.logout();
          this.authGuard.redirectUrl=this.router.url;
          this.router.navigate([this.localizeService.translateRoute('/sign-in-route')]);
        }
      }
    });  
  }
  private deleteReaction(){
    this.themeService.deleteReactionTheme(this.bindContent.transform(this.archeologyDetail,this.language,'_id',undefined),this.localizeService.parser.currentLang).subscribe(data=>{
      if(data.success){
        this.getSingleTheme();
      }
    });  
  }
  */
    private passCoordinates(){
      var market_info={
        title:this.event.title,
        icon:this.categories[this.categories.length-1].icons[0].url, // Event field
        lat:this.event.place.coordinates.lat, // Lat field
        lng:this.event.place.coordinates.lng, // Lng field
      }
      this.observableService.mapType="event-form-coordinates";
      this.observableService.notifyOther({option: this.observableService.mapType, value: market_info});
  }
  private getEvent(){
    this.eventService.getEvent(this.activatedRoute.snapshot.params['id'],this.localizeService.parser.currentLang).subscribe(data=>{
      if(data.success){
        this.event=data.event;
        this.categories=data.categories;
        this.initializeGalleryImages(this.event.images.poster);
        setTimeout(() => {
          this.passCoordinates();
        });

        /*this.images=[];
        this.archeologyDetail=data.theme;
        this.passCoordinates();
        this.reactions=['like','love','haha','wow','sad','angry'];
        //Put reaction text
        var reactionsCount=0;
        var myReaction=false;

        this.allReactions=[];
        this.existReactionAndUsernames=[];
        for (var i = 0; i < this.reactions.length; i++) {
          if(this.authService.user){
            if (this.bindContent.transform(this.archeologyDetail,this.language,'reactions',this.reactions[i]+'By').includes(this.authService.user.username)) {           
              myReaction=true;
              //change my username
              for (var j = 0; j < this.bindContent.transform(this.archeologyDetail,this.language,'reactions',this.reactions[i]+'By').length; j++) {
                if(this.authService.user.username===this.bindContent.transform(this.archeologyDetail,this.language,'reactions',this.reactions[i]+'By')[j]){
                  this.bindContent.transform(this.archeologyDetail,this.language,'reactions',this.reactions[i]+'By').splice(j,1);
                  this.translate.get('reaction.you').subscribe(
                  you => {
                    this.bindContent.transform(this.archeologyDetail,this.language,'reactions',this.reactions[i]+'By').splice(0,0,you);

                  });
                }
              }
              var translateReaction=this.translate.get('reaction.'+this.reactions[i]).subscribe(
              data => {            
                $(".like-btn-emo").removeClass().addClass('like-btn-emo').addClass('like-btn-'+this.reactions[i]);
                $(".like-btn-text").text(data).removeClass().addClass('like-btn-text').addClass('like-btn-text-'+this.reactions[i]).addClass("active");    
                
              });
            }
          }
          reactionsCount= reactionsCount+this.bindContent.transform(this.archeologyDetail,this.language,'reactions',this.reactions[i]+'By').length;
          //reactions and count reactions to modal;
          var reactionAndUsernamesObj={reaction:this.reactions[i],usernames:this.bindContent.transform(this.archeologyDetail,this.language,'reactions',this.reactions[i]+'By')};
          this.existReactionAndUsernames.push(reactionAndUsernamesObj);
          this.allReactions=this.allReactions.concat(this.bindContent.transform(this.archeologyDetail,this.language,'reactions',this.reactions[i]+'By'));
        } 
        if(myReaction===true){ 
          //reactions count
          if(reactionsCount===1){
            reactionsCount=reactionsCount-1;
            setTimeout(() => {
              this.translate.get('reaction.you').subscribe(
              data => {
                 $(".like-details").html(data);
              });
            }, 0);      
          }else if(reactionsCount>1){   
            reactionsCount=reactionsCount-1; 
            setTimeout(() => {
              this.translate.get('reaction.you-and').subscribe(
              youAnd => {
                this.translate.get('reaction.others').subscribe(
                  others => {
                    $(".like-details").html(youAnd+reactionsCount +others);
                  });
              });
            }, 0); 
          }   
        }else{
          $(".like-btn-text").text("Like").removeClass().addClass('like-btn-text');
          $(".like-btn-emo").removeClass().addClass('like-btn-emo').addClass("like-btn-default");
          if(reactionsCount){
            setTimeout(() => {
              $(".like-details").html(reactionsCount);
            }, 0);
             
          }else{
            setTimeout(() => {
              $(".like-details").html("");
            }, 0);     
          }        
        } 
       for (var i = 0; i < this.archeologyDetail.images.principal.length; ++i) {
          this.images.push(new Image(this.archeologyDetail.images.principal[i].location,null,null));
        }  
        */
      }

    });
  }
   //reactions modal

  /*private reactionStaticModalShow(currentReaction,existReactionAndUsernames,allReactions) {
    const activeModal = this.modalService.open(ReactionsModalComponent, {backdrop: 'static'});
    activeModal.componentInstance.currentReaction = currentReaction;
    activeModal.componentInstance.existReactionAndUsernames = existReactionAndUsernames;

  }
  private reactionClick(currentReaction){
    this.reactionStaticModalShow(currentReaction,this.existReactionAndUsernames,this.allReactions);
  }*/

  private scrollComment(){
    $("#comment").focus();
  }


  ngOnInit() {
    this.getEvent();
    this.initializeGalleryOptions();
  
  }
}



