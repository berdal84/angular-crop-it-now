import { Component} from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent  {

  files: any = [];
  imgURL: any;

  uploadFile(event) {
    /* remove existing files (we only wants a single file to edit */
    if ( this.files.length > 0)
    {
      this.files = [];
    }

    /* add the first dragged file (draggin multiple files is allowed by browsers, we ignore them)*/
    if( event.length > 0)
    {
      const file = event[0];
      this.files.push(file.name);

      if (this.files.length === 0)
      return;
  
      var mimeType = file.type;
      if (mimeType.match(/image\/*/) == null) {
        // "Only images are supported.";
        return;
      }
  
      var reader = new FileReader();
      reader.readAsDataURL(file); 
      reader.onload = (_event) => { 
        this.imgURL = reader.result; 
      }    
    }
  }

  deleteAttachment(index) {
    this.files.splice(index, 1)
  }
}

/*
* original file by https://github.com/MariemChaabeni
* modified by Bérenger Dalle-Cort
*/