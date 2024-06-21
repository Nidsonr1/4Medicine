import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiaryViewComponent } from './diary-view.component';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@NgModule({
  declarations: [DiaryViewComponent],
  imports: [CommonModule, NzIconModule, NzToolTipModule],
  exports: [DiaryViewComponent],
})
export class DiaryViewModule {}
