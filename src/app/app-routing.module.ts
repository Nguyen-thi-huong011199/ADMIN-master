import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoaicvComponent } from './loaicv/loaicv.component';
import { VieclamComponent } from './vieclam/vieclam.component';
import { KhuvucComponent } from './khuvuc/khuvuc.component';
import { UserndComponent } from './usernd/usernd.component';
import { HosoComponent } from './hoso/hoso.component';

const routes: Routes = [
  {path:'',component:VieclamComponent},
  {path:'loai-cv',component:LoaicvComponent},
  {path:'viec-lam',component:VieclamComponent},
  {path:'khu-vuc',component:KhuvucComponent},
  {path:'user-nd',component:UserndComponent},
  {path:'ho-so',component:HosoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
