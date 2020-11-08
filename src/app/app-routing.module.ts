import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoaicvComponent } from './loaicv/loaicv.component';
import { VieclamComponent } from './vieclam/vieclam.component';

const routes: Routes = [
  {path:'',component:VieclamComponent},
  {path:'loai-cv',component:LoaicvComponent},
  {path:'viec-lam',component:VieclamComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
