import { AfterViewInit, Component, Injector, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { BaseComponent } from '../_lib/base.component';
import { AlertService } from '../_services/alert.service';
import { FileService } from '../_services/file.service';
import { LoaiCongViecService } from '../_services/loaicv.service';
import { UserNdService } from '../_services/usernd.service';

declare var $: any;

@Component({
  selector: 'app-usernd',
  templateUrl: './usernd.component.html',
  styleUrls: ['./usernd.component.css']
})
export class UserndComponent extends BaseComponent implements OnInit, AfterViewInit {
  submitted: boolean;
  loading: boolean;
  isCreate: boolean;
  form: FormGroup;
  totalRecords: number;
  pageSize: number = 10;
  page: number = 1;
  id_update: any;
  data: any = [];

  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;

  constructor(injector: Injector,
    private userndService: UserNdService,
    private formBuilder: FormBuilder,
    private alert: AlertService,
    private fileService: FileService
  ) {
    super(injector);
  }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      Tenuser: ['', Validators.required],
      Diachi: ['', Validators.required],
      Noilamviec: ['', Validators.required],
    });

    this.onLoadAll();
  }
  
  get f() {
    return this.form.controls;
  }

  onLoadAll() {
    this.userndService.getPagination(this.page, this.pageSize).toPromise()
    .then(res => {
      this.totalRecords = res.rowCount;
      this.data = res.results;

      // console.log(res);
    })
    .catch(err => console.log(err));
  }

  onLoadPage(page) {
    this.page = page;
    this.onLoadAll();
  }

  ngAfterViewInit() {
    this.loadScripts();
  }

  onCreate() {
    this.isCreate = true;

    this.form.patchValue({
      Tenuser: '',
      Diachi: '',
      Noilamviec: '',
    });

    this.file_image.clear();
    this.openModal();
  }

  onEdit(item) {
    this.isCreate = false;

    this.id_update = item.mauser;

    this.form.patchValue({
      Tenuser: item.tenuser,
      Diachi: item.diachi,
      Noilamviec: item.noilamviec,
    });
    this.file_image.clear();
    this.openModal();
  }

  onDelete(item) {
    this.alert.delete(() => {
      this.loading = true;
      this.userndService.delete(item.mauser).toPromise()
      .then(res => {
        this.loading = false;
        this.alert.success("Đã xóa user thành công!");
        this.onLoadAll();
      })
      .catch(err => {
        this.loading = false;
        this.alert.error(err);
      });
    });
  }

   onSubmit() {
     this.submitted = true;

     let file = this.file_image.files[0];

     if (this.form.invalid || (this.isCreate &&  !this.file_image.hasFiles())) {
       return;
     }
 
    this.loading = true;

    let formData = {
      Mauser: this.id_update,
      Tenuser: this.form.value.Tenuser,
      Diachi: this.form.value.Diachi,
      Noilamviec: this.form.value.Noilamviec,
      Anhdaidien: undefined
    };

    if(this.isCreate) {

      this.fileService.getEncodeFromImage(file).subscribe(data => {
        if(data != null) {
          formData.Anhdaidien = data;

      this.userndService.create(formData).toPromise()
      .then(res => {
        this.loading = false;
        this.onLoadAll();
        this.closeModal();
        this.alert.success("Đã thêm user thành công!");
      })
      .catch(err => {
        this.loading = false;
        this.alert.error(err);
      });
        }
      });


    } else {

      this.fileService.getEncodeFromImage(file).subscribe(data => {
        if(data != null) {
          formData.Anhdaidien = data;
        }

      this.userndService.update(this.id_update, formData).toPromise()
      .then(res => {
        this.loading = false;
        this.onLoadAll();
        this.closeModal();
        this.alert.success("Đã sửa user thành công!");
      })
      .catch(err => {
        this.loading = false;
        this.alert.error(err);
      });
    });

  }
}
openModal() {
  this.submitted = false;
  $("#myModal").modal("show");
}

closeModal() {
  $("#myModal").modal("hide");
}
}
