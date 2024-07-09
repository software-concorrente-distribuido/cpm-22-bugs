import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputsModule } from './inputs/inputs.module';
import { HeaderComponent } from './header/header.component';
import { EtherButtonComponent } from './ether-button/ether-button.component';
import { EtherNavigationComponent } from './ether-navigation/ether-navigation.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent,
    EtherButtonComponent,
    EtherNavigationComponent,
  ],
  imports: [
    CommonModule,
    InputsModule,
    RouterModule
  ],
  exports: [
    InputsModule,
    HeaderComponent,
    EtherButtonComponent,
    EtherNavigationComponent
  ]
})
export class ComponentsModule { }
