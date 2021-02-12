import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Stream } from 'stream';
import { RestSrvc } from '../srvc/srvc.service';


@Component({
    selector: 'file-upload',
    template:`
    <div style="text-align:center; margin-top:80px;">
    <p>Upload Web Resources</p>
    Is NewFolder:&nbsp;&nbsp;<input type="checkbox" class="chkBox" [(ngModel)]="isNew">
    Dest. Dir:&nbsp;&nbsp;<input type="text" [(ngModel)]="destDir">
    <input type="file" [multiple]="multiple" #fileInput>
    <input type="button" (click)="upload()" value="Upload"> 
    </div>
    `
})
export class FileUploadComponent {
    @Input() multiple: boolean = false;
    @ViewChild('fileInput') inputEl: ElementRef;
     formData:FormData = new FormData();
    isNew:string;
    destDir:string;
    constructor(private http: HttpClient, private srvc: RestSrvc) { 
        
    }
    onFileSelect(){

  
        let inputEl: HTMLInputElement = this.inputEl.nativeElement;
        let fileCount: number = inputEl.files.length;
           
        console.log('File Count:');
        
        console.log(fileCount);
        
        if (fileCount > 0) { // a file was selected

            for (let i = 0; i < fileCount; i++) {
                this.formData.append('file', inputEl.files.item(i),inputEl.files.item(i).name);
                this.formData.append('isNew', this.isNew);
                this.formData.append('destDir',this.destDir);
                console.log(inputEl.files.item(i));
                
            }
            console.log('FormData ? =======');
            console.log(this.formData.getAll);
            
            // this.fileData.file=inputEl.files.item(0).stream;
            
            // console.log(inputEl.files.item(0).stream());
            // console.log(inputEl.files.item(0).arrayBuffer());
            // console.log(inputEl.files.item(0).name);
            // console.log(inputEl.files.item(0).size);
            // // console.log(inputEl.files.item(0).slice);
            // console.log(inputEl.files.item(0).text());
            // console.log(inputEl.files.item(0).type);

            // formData.forEach(e=>{
            //     console.log(e);
                
            // })
            const fileInfo = {'file':this.formData,'fileMetaData':inputEl.files.item(0).name,'isNew':'yes','destDir':'extDir'};
          
        }
    }
        upload() {
          
            this.http
                .post(this.srvc.appBaseUrl + 'rest/fileProcess/uploadFiles', this.formData).subscribe(resp=>{
                    console.log('Response after file upload');
                    console.log(resp);
                    
                    
                });
            // do whatever you do...
            // subscribe to observable to listen for response
        }
    
}

export class FileData{
    fileMetaData:string;
    file:Stream;
    isNew:number;
    destDir:string;
}