import { Component, OnInit,ViewChild } from '@angular/core';
import { ImageCropperComponent, CropperSettings } from "ngx-img-cropper";
import { FileUploaderService} from '../../../../services/file-uploader.service';
import { FileUploader,FileUploaderOptions } from 'ng2-file-upload';
import { AuthService } from '../../../../services/auth.service';
import { LocalizeRouterService } from 'localize-router';
import domtoimage from 'dom-to-image';
const URL = 'http://localhost:8080/fileUploader/uploadImages/profile';
@Component({
   selector: 'user-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {
   	private image: any;
    private data: any;
    private profileCropperSettings: CropperSettings;
    private images=[];
	private uploadOptions;
    private hasBaseDropZoneOver: boolean = false;
    private hasAnotherDropZoneOver: boolean = false;
    private uploadAllSuccess:Boolean=true;
    private uploader:FileUploader = new FileUploader({
    url: URL,itemAlias: 'profile',
    isHTML5: true,
    allowedMimeType: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'],
    maxFileSize: 10*1024*1024 // 10 MB
  	});
    @ViewChild('profileCropper', undefined)
    profileCropper: ImageCropperComponent;

    @ViewChild('profileEditorModal') profileEditorModal;

    constructor(
    	private authService:AuthService,
    	private localizeService:LocalizeRouterService,
    	private fileUploaderService: FileUploaderService
    ) {
    	this.profileCropperSettings = new CropperSettings();
	    this.profileCropperSettings.width = 200;
	    this.profileCropperSettings.height = 200;

	    this.profileCropperSettings.croppedWidth = 200;
	    this.profileCropperSettings.croppedHeight = 200;

	    this.profileCropperSettings.canvasWidth = 500;
	    this.profileCropperSettings.canvasHeight = 300;

	    this.profileCropperSettings.minWidth = 10;
	    this.profileCropperSettings.minHeight = 10;

	    this.profileCropperSettings.rounded = true;
	    this.profileCropperSettings.keepAspect = false;

	    this.profileCropperSettings.cropperDrawSettings.strokeColor =
	      "rgba(255,255,255,1)";
	    this.profileCropperSettings.cropperDrawSettings.strokeWidth = 2;
	    this.data = {};
    }
    private uploadBase64(){

      const uploadData = {
       language:this.localizeService.parser.currentLang,
       image: this.data.image,
       name:this.uploader.queue[0].file.name,
       bucket:'profile'
      };
      this.fileUploaderService.uploadImagesBase64(uploadData).subscribe(data=>{
      	console.log(data);
      });
  
    }
    private fileChangeListener($event){

	  this.image = new Image();
	  var file:File = $event.target.files[0];
	  var fileReader: FileReader = new FileReader();
	  var that = this;
	  fileReader.onloadend = function (loadEvent: any) {
       that.image.src = loadEvent.target.result;
       that.profileCropper.setImage(that.image);
	  };

	  fileReader.readAsDataURL(file);
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
	this.uploader.onAfterAddingFile = (f)=> { 
		if (this.uploader.queue.length > 1) {
			this.uploader.removeFromQueue(this.uploader.queue[0]);
		}
		f.withCredentials = false;  
	};

	//override onBuildItemForm to pass parameter language to server
	this.uploader.onBuildItemForm = (item, form) => {
	  form.append('language', this.localizeService.parser.currentLang);
	};
	 //overide the onCompleteItem property of the uploader so we are 
	//able to deal with the server response.
	this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
	  //console.log("ImageUpload:uploaded:", item, status, response);
	  const responseJson=JSON.parse(response);
	  this.images.push(responseJson.file[0]);
	  if(!responseJson.success){
	    this.uploadAllSuccess=false;
	  }    
	  if(this.uploader.progress===100 && this.uploadAllSuccess){
	    console.log(this.images);
	    //this.saveImageUrl(this.image);
	    

	  }

	};
	this.uploader.onWhenAddingFileFailed = (fileItem) => {
	  if(fileItem.size>10*1024*1024){
	    console.log("fitzategi haundiegia");
	  }else if(!(fileItem.type === "image/png" ||fileItem.type === "image/jpg" ||fileItem.type === "image/jpeg" || fileItem.type === "image/gif")){
	    console.log("formatu okerra");
	  }
	  console.log("fail", fileItem);
	  //this.failFlag = true;
	}
	//call the angular http method
	/*this.fileUploaderService.uploadFiles(JSON.stringify(this.uploader.queue)).subscribe(data=>{
	  console.log(data);
	});*/

	}

    ngOnInit() {
       //File uploader options
      this.setUploaderOptions();
   }

}
