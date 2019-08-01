import { Component} from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent  {

  files: any = [];

  uploadFile(event) {

    /* remove existing files (we only wants a single file to edit */
    if ( this.files.length > 0)
    {
      this.files = [];
    }

    /* add the first dragged file (draggin multiple files is allowed by browsers, we ignore them)*/
    if( event.length > 0)
    {
      const element = event[0];
      this.files.push(element.name);    
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