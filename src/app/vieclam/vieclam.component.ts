import { AfterViewInit, Component, Injector, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { BaseComponent } from '../_lib/base.component';
import { AlertService } from '../_services/alert.service';
import { FileService } from '../_services/file.service';
import { ViecLamService } from '../_services/vieclam.service';
import { LoaiCongViecService } from '../_services/loaicv.service';

declare var $: any;

@Component({
  selector: 'app-vieclam',
  templateUrl: './vieclam.component.html',
  styleUrls: ['./vieclam.component.css']
})
export class VieclamComponent extends BaseComponent implements OnInit, AfterViewInit {
  list = [];
  submitted: boolean;
  loading: boolean;
  isCreate: boolean;
  form: FormGroup;
  totalRecords: number;
  pageSize: number = 10;
  page: number = 1;
  id_update: any;
  loaisps: any = [];
  data: any = [];
  
  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;

  constructor(injector: Injector,
    private vieclamService: ViecLamService,
    private loaicvService: LoaiCongViecService,
    private formBuilder: FormBuilder,
    private alert: AlertService,
    private fileService: FileService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.loaicvService.getAll().toPromise()
    .then(res => {
      this.loaisps = res;
    });

    this.form = this.formBuilder.group({
      TenSP: ['', Validators.required],
      MaLoai: ['', Validators.required],
      MoTa: ['', Validators.required],
      SoLuong: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      Gia: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });

    this.onLoadAll();
  }
  
  get f() {
    return this.form.controls;
  }

  onLoadAll() {
    this.vieclamService.getPagination(this.page, this.pageSize).toPromise()
    .then(res => {
      this.totalRecords = res.rowCount;
      this.data = res.results;
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
      TenSP: '',
      MaLoai: '',
      MoTa: '',
      SoLuong: '',
      Gia: '',
    });

    this.file_image.clear();
    this.openModal();
  }

  onEdit(item) {
    this.isCreate = false;

    this.id_update = item.maSp;

    this.form.patchValue({
      TenSP: item.tenSp,
      MaLoai: item.maLoai,
      MoTa: item.moTa,
      SoLuong: item.soLuong,
      Gia: item.gia,
    });

    this.file_image.clear();
    this.openModal();
  }

  onDelete(item) {
    this.alert.delete(() => {
      this.loading = true;
      this.vieclamService.delete(item.maSp).toPromise()
      .then(res => {
        this.loading = false;
        this.alert.success("Đã xóa sản phẩm thành công!");
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
      MaLoai: this.form.value.MaLoai,
      TenSP: this.form.value.TenSP,
      MoTa: this.form.value.MoTa,
      SoLuong: this.form.value.SoLuong,
      Gia: this.form.value.Gia,
      HinhAnh: undefined
    };

    if(this.isCreate) {

      this.fileService.getEncodeFromImage(file).subscribe(data => {
        if(data != null) {
          formData.HinhAnh = data;

          this.vieclamService.create(formData).toPromise()
          .then(res => {
            this.loading = false;
            this.onLoadAll();
            this.closeModal();
            this.alert.success("Đã thêm sản phẩm thành công!");
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
          formData.HinhAnh = data;
        }

        this.vieclamService.update(this.id_update, formData).toPromise()
        .then(res => {
          this.loading = false;
          this.onLoadAll();
          this.closeModal();
          this.alert.success("Đã sửa sản phẩm thành công!");
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
