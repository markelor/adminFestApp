import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { LocalizeRouterService } from 'localize-router';
@Injectable()
export class FileUploaderService {
  public domain = this.authService.domain;
  public route;
  constructor(
    private authService: AuthService,
    private localizeService:LocalizeRouterService,
    private http: HttpClient
  ) { }

  // Function to create a new theme post
  public deleteImages(imageId,bucket,language) {
    this.route=encodeURIComponent(imageId)+'/'+encodeURIComponent(bucket)+'/';
     return this.http.delete<any>(this.domain + 'fileUploader/deleteImages/'+this.route+language);
  }
  // Function to create a new theme post
  public getSignatureFroala() {
     return this.http.get<any>(this.domain + 'fileUploader/getSignatureFroala');
  }

}
