import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';


import { DataPage } from './data.page';

const routes: Routes = [
  {
    path: '',
    component: DataPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DataPage]
})
export class DataPageModule {}
