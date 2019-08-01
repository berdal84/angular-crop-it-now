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
        this.uploadMessage = "Great! The PNG file is ready to use.";
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
    // Align origin with the first corner
    var crop_selection = document.getElementById("crop-selection");
    var corner1 = document.getElementById("crop-corner-1");
    crop_selection.style.transform = corner1.style.transform;

    // set width and height
    crop_selection.style.width = this.computeCropSelectionWidth() + "px";
    crop_selection.style.height = this.computeCropSelectionHeight() + "px";
  }

  computeCropSelectionWidth() {
    var corner1 = document.getElementById("crop-corner-1");
    var corner2 = document.getElementById("crop-corner-2");

    var style1 = window.getComputedStyle(corner1);
    var matrix1 = new WebKitCSSMatrix(style1.webkitTransform);

    var style2 = window.getComputedStyle(corner2);
    var matrix2 = new WebKitCSSMatrix(style2.webkitTransform);

    return matrix2.m41 - matrix1.m41;
  }

  computeCropSelectionHeight() {
    var corner1 = document.getElementById("crop-corner-1");
    var corner2 = document.getElementById("crop-corner-2");

    var style1 = window.getComputedStyle(corner1);
    var matrix1 = new WebKitCSSMatrix(style1.webkitTransform);

    var style2 = window.getComputedStyle(corner2);
    var matrix2 = new WebKitCSSMatrix(style2.webkitTransform);

    return matrix2.m42 - matrix1.m42;
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