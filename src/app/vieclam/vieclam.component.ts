import { AfterViewInit, Component, Injector, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { BaseComponent } from '../_lib/base.component';
import { AlertService } from '../_services/alert.service';
import { FileService } from '../_services/file.service';
import { ViecLamService } from '../_services/vieclam.service';
import { LoaiCongViecService } from '../_services/loaicv.service';
import { NhatuyendungService } from '../_services/nhatuyendung.service';
import { KhuvucService } from '../_services/khuvuc.service';

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
  loaicvs: any = [];
  nhatuyendungs: any = [];
  khuvucs: any = [];
  data: any = [];
  
  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;

  constructor(injector: Injector,
    private vieclamService: ViecLamService,
    private loaicvService: LoaiCongViecService,
    private nhatuyendungService: NhatuyendungService,
    private khuvucService: KhuvucService,
    private formBuilder: FormBuilder,
    private alert: AlertService,
    private fileService: FileService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.loaicvService.getAll().toPromise()
    .then(res => {
      this.loaicvs = res;
    });

    this.nhatuyendungService.getAll().toPromise()
    .then(res => {
      this.nhatuyendungs = res;
    });

    this.khuvucService.getAll().toPromise()
    .then(res => {
      this.khuvucs = res;
    });

    this.form = this.formBuilder.group({
      MaloaiCv: ['', Validators.required],
      MaNtd: ['', Validators.required],
      MaKv: ['', Validators.required],
      TenCv: ['', Validators.required],
      Tencongty: ['', Validators.required],
      MotaCv: ['', Validators.required],
      Mucluong: ['', Validators.required],
      Diachi: ['', Validators.required],
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
    .catch(err => console.error(err));
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
      MaloaiCv: '',
      MaNtd: '',
      MaKv: '',
      TenCv: '',
      Tencongty: '',
      MotaCv: '',
      Mucluong: '',
      Diachi: '',
    });

    this.file_image.clear();
    this.openModal();
  }

  onEdit(item) {
    this.isCreate = false;

    this.id_update = item.maCv;

    this.form.patchValue({
      MaloaiCv: item.maloaiCv,
      MaNtd: item.maNtd,
      MaKv: item.maKv,
      TenCv: item.tenCv,
      Tencongty: item.tencongty,
      MotaCv: item.motaCv,
      Mucluong: item.mucluong,
      Diachi: item.diachi,
    });

    this.file_image.clear();
    this.openModal();
  }

  onDelete(item) {
    this.alert.delete(() => {
      this.loading = true;
      this.vieclamService.delete(item.maCv).toPromise()
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
      MaloaiCv: this.form.value.MaloaiCv,
      MaNtd: this.form.value.MaNtd,
      MaKv: this.form.value.MaKv,
      TenCv: this.form.value.TenCv,
      Tencongty: this.form.value.Tencongty,
      MotaCv: this.form.value.MotaCv,
      Mucluong: this.form.value.Mucluong,
      Diachi: this.form.value.Diachi,
      Anh: undefined
    };

    if(this.isCreate) {

      this.fileService.getEncodeFromImage(file).subscribe(data => {
        if(data != null) {
          formData.Anh = data;

          this.vieclamService.create(formData).toPromise()
          .then(res => {
            this.loading = false;
            this.onLoadAll();
            this.closeModal();
            this.alert.success("Đã thêm công việc thành công!");
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
          formData.Anh = data;
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
