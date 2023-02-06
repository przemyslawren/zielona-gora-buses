import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoComponent } from './crypto.component';



@NgModule({
  declarations: [
    CryptoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CryptoComponent
  ]
})
export class CryptoModule { }
