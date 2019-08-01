import { Component} from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent  {

  uploadedFileNames: any = [];
  imgURL: any;
  showUploadContainer : any = true;
  uploadMessage:any = "";

  uploadFile(event) {
    /* remove existing files (we only wants a single file to edit
    * I keep an array because the original code was permitting multiple upload
    * this feature could be usefull later to work on several PNG at the same time.
    */
    if ( this.uploadedFileNames.length > 0)
    {
      this.uploadedFileNames = [];
    }

    /* add the first dragged file (draggin multiple files is allowed by browsers, we ignore them)*/
    if( event.length > 0)
    {
      const file = event[0];
      this.uploadedFileNames.push(file.name);
  
      var mimeType = file.type;
      if (mimeType.match(/image\/*/) != null) {  
        var reader = new FileReader();
        reader.readAsDataURL(file); 
        reader.onload = (_event) => { 
          this.imgURL = reader.result; 
        }
        this.uploadMessage = "Great! go to Step 2.";
      }else{
        this.uploadMessage = "Unable to upload this file because it is not an image.";
      }
    }else{
      this.uploadMessage = "Upload problem !";
    }

    this.updateUploadContainerVisibility();
  }

  updateUploadContainerVisibility()
  {
    this.showUploadContainer = this.uploadedFileNames.length == 0;
  }

  deleteAttachment(index) {
    this.uploadedFileNames.splice(index, 1)
    this.updateUploadContainerVisibility();
    this.uploadMessage = "File deleted, drag an other file to crop-it.";
  }
}

/*
* original file by https://github.com/MariemChaabeni
* modified by Bérenger Dalle-Cort
*/