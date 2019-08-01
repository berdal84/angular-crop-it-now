import {Component} from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

/**
 * @title Basic Drag&Drop
 */
@Component({
  selector: 'app-crop',
  templateUrl: './crop.component.html',
  styleUrls: ['./crop.component.css'],
})

export class CropComponent  {

  uploadedFileNames: any = [];
  imgURL: any;
  showUploadContainer : any = true;
  uploadMessage:any = "";
  corner_1_top: any = "50px";
  corner_1_left: any = "50px";

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

  updateCropSelection(event)
  {
    this.uploadMessage = "updateCropSelection";
    document.getElementById("crop-selection").style.left = document.getElementById("crop-corner-1").style.left;
    document.getElementById("crop-selection").style.top = document.getElementById("crop-corner-1").style.top;
    document.getElementById("crop-selection").style.transform = document.getElementById("crop-corner-1").style.transform;

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