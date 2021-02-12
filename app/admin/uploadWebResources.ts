import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { RestSrvc } from "../srvc/srvc.service";

@Component(
    {
        selector:'upload-web-rescources',
        templateUrl:'uploadWebResources.html',
        styleUrls:[]
    }
)
export class UploadWebResources implements OnInit{
file:string;
isNew:string;
destDir:string
formData = new FormData();


    constructor(private srvc:RestSrvc){
        this.formData = new FormData();
    }
    ngOnInit(): void {
     
    }
    upload(){
  
        this.srvc.fileReqRespAjax('rest/file/uploadFile',this.formData,null).subscribe(txt=>{

        });
    }

    onFileSelect(event) {
        if (event.target.files.length > 0) {
          this.file = event.target.files[0];
          console.log(this.file)
        //  const formData = new FormData();
         this.formData.append('file',this.file);
         this.formData.append('isNew',this.isNew)
         this.formData.append('destDir',this.destDir)
        //   formData.append('',)
          // this.uploadForm.get('profile').setValue(file);
        }
      }
}