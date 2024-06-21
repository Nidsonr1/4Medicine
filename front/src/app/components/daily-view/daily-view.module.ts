import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

import { DailyViewComponent } from './daily-view.component';

@NgModule({
  declarations: [DailyViewComponent],
  imports: [CommonModule, NzIconModule, NzButtonModule, NzPopconfirmModule],
  exports: [DailyViewComponent],
})
export class DailyViewModule {}
