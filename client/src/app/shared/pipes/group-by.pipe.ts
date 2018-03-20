import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupBy'
})
export class GroupByPipe implements PipeTransform {

  transform(value: Array<any>, field: string): Array<any>  {
    const groupedObj = value.reduce((prev, cur)=> {
      if(field==='firstOriginCommentId'&&!cur.originCommentId.length){
        console.log("bat");
        cur.firstOriginCommentId=cur._id;
        cur.reply=false;
      }else if(field==='firstOriginCommentId'&&cur.originCommentId.length){
        console.log("bestiak");
        console.log(cur.originCommentId[0]);
        cur.firstOriginCommentId=cur.originCommentId[0];       
        cur.reply=true;
      }else if(field==='firstParentId'&&!cur.firstParentId){
        cur.firstParentId=cur._id;   
      }  
      if(!prev[cur[field]]) {
        prev[cur[field]] = [cur];
      } else {
        prev[cur[field]].push(cur);
      }
      return prev;
    }, {});
    return Object.keys(groupedObj).map(key => ({ key, value: groupedObj[key] }));
  }
}
