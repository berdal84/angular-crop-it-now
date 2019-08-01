import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { HomeComponent } from './home/home.component';
import { CropComponent } from './crop/crop.component';
import { DragDropDirective } from './drag-drop.directive';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    HomeComponent,
    CropComponent,
    DragDropDirective    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    DragDropModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
    ])
  ],  
  bootstrap: [ AppComponent  ]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/