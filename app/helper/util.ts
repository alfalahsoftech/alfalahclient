import { Injectable } from "@angular/core";

@Injectable()
export class AFUtil{


    findMatched(array:any[],key:any):any{
       var matched={key:'',value:{},isMatched:false,index:-1};
        for (let i = 0; i < array.length; i++) {
            var obj = array[i];
            if ( obj==key) {
                matched.key = key;
                matched.index = i;
                console.log("Item Matched=>");
                matched.value = obj;
                matched.isMatched=true;
                break;     
            }
        }
        return matched;
    }
}