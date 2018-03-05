import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'

@Pipe({
  name: 'safeHtml'
})
export class BindContentPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {}
  transform(object: any, language: any,property1:any,property2:any): any {
  	if(property1==="location"){
  		var propertyEval =eval('object.languages.'+language+'[0].'+property1+'.'+property2);
  	}else if(property1==="reactions"){
      var propertyEval =eval('object.languages.'+language+'[0].'+property1+'.'+property2);
    }else if(property1==="description"){
      var propertyEval =eval('object.languages.'+language+'[0].'+property1);
      propertyEval=this.sanitized.bypassSecurityTrustHtml(propertyEval);
    }else{
  		var propertyEval =eval('object.languages.'+language+'[0].'+property1);
  	}
  	    
    return propertyEval;
  }

}
