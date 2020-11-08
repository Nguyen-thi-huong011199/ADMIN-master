import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { EditorModule } from 'primeng/editor';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TrucatePipe } from '../_pipe/truncate.pipe';
import { GetImagePipe } from '../_pipe/getimage.pipe';
import { LoadingDirective } from '../_directive/loading.directive';

@NgModule({
  declarations: [
    TrucatePipe,
    GetImagePipe,
    LoadingDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TrucatePipe,
    GetImagePipe,
    LoadingDirective,
    ReactiveFormsModule,
    FormsModule,
    FileUploadModule,
    EditorModule,
    TableModule,
    NgbModule,
    DropdownModule,
    CommonModule
  ]
})
export class ShareModule { }
