import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'

@Pipe({
  name: 'safeHtml'
})
export class BindContentPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {}
  transform(content: any): any { 
    return this.sanitized.bypassSecurityTrustHtml(content);
  }

}
