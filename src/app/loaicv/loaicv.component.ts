import { AfterViewInit, Component, Injector, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { BaseComponent } from '../_lib/base.component';
import { AlertService } from '../_services/alert.service';
import { FileService } from '../_services/file.service';
import { LoaiCongViecService } from '../_services/loaicv.service';
import { ViecLamService } from '../_services/vieclam.service';

declare var $: any;

@Component({
  selector: 'app-loaicv',
  templateUrl: './loaicv.component.html',
  styleUrls: ['./loaicv.component.css']
})
export class LoaicvComponent extends BaseComponent implements OnInit,  AfterViewInit {
  submitted: boolean;
  loading: boolean;
  isCreate: boolean;
  form: FormGroup;
  totalRecords: number;
  pageSize: number = 10;
  page: number = 1;
  id_update: any;
  data: any = [];

  constructor(
    injector: Injector,
    private loaicvService: LoaiCongViecService,
    private formBuilder: FormBuilder,
    private alert: AlertService
  ) {
    super(injector);
  }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      TenloaiCv: ['', Validators.required],
    });

    this.onLoadAll();
  }
  
  get f() {
    return this.form.controls;
  }

  onLoadAll() {
    this.loaicvService.getPagination(this.page, this.pageSize).toPromise()
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
      TenloaiCv: '',
    });
    this.openModal();
  }

  onEdit(item) {
    this.isCreate = false;

    this.id_update = item.maloaiCv;

    this.form.patchValue({
      TenloaiCV: item.tenloaiCv,
    });
    this.openModal();
  }

  onDelete(item) {
    this.alert.delete(() => {
      this.loading = true;
      this.loaicvService.delete(item.maloaiCv).toPromise()
      .then(res => {
        this.loading = false;
        this.alert.success("Đã xóa loại công việc thành công!");
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

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    let formData = {
      MaloaiCv: this.id_update,
      TenloaiCv: this.form.value.TenloaiCv,
    };

    if(this.isCreate) {

      this.loaicvService.create(formData).toPromise()
      .then(res => {
        this.loading = false;
        this.onLoadAll();
        this.closeModal();
        this.alert.success("Đã thêm loại công việc thành công!");
      })
      .catch(err => {
        this.loading = false;
        this.alert.error(err);
      });

    } else {

      this.loaicvService.update(this.id_update, formData).toPromise()
      .then(res => {
        this.loading = false;
        this.onLoadAll();
        this.closeModal();
        this.alert.success("Đã sửa loại công việc thành công!");
      })
      .catch(err => {
        this.loading = false;
        this.alert.error(err);
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
  
