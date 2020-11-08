import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DautrangComponent } from './dautrang/dautrang.component';
import { CuoitrangComponent } from './cuoitrang/cuoitrang.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShareModule } from './share/share.module';
import { HttpClientModule } from '@angular/common/http';
import { LoaicvComponent } from './loaicv/loaicv.component';
import { VieclamComponent } from './vieclam/vieclam.component';


@NgModule({
  declarations: [
    AppComponent,
    DautrangComponent,
    CuoitrangComponent,
    LoaicvComponent,
    VieclamComponent,
   
  
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ShareModule,
    AppRoutingModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
