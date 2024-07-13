import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputsModule } from './inputs/inputs.module';
import { HeaderComponent } from './header/header.component';
import { EtherButtonComponent } from './ether-button/ether-button.component';
import { EtherNavigationComponent } from './ether-navigation/ether-navigation.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from './forms/forms.module';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { DialogsModule } from './dialogs/dialogs.module';



@NgModule({
  declarations: [
    HeaderComponent,
    EtherButtonComponent,
    EtherNavigationComponent,
    SplashScreenComponent,
    SnackbarComponent
  ],
  imports: [
    CommonModule,
    InputsModule,
    RouterModule,
    FormsModule,
    DialogsModule
  ],
  exports: [
    InputsModule,
    HeaderComponent,
    EtherButtonComponent,
    EtherNavigationComponent,
    FormsModule,
    DialogsModule,
    SplashScreenComponent,
    SnackbarComponent,
  ]
})
export class ComponentsModule { }
