import { NgModule } from '@angular/core';
import { ButtonComponent } from './components/button/button.component';
import { CommonModule } from '@angular/common';
import { BlockComponent } from './components/block/block.component';

@NgModule({
    declarations: [ButtonComponent, BlockComponent],
    imports: [CommonModule],
    exports: [ButtonComponent, BlockComponent],
})
export class ControlsModule {}
