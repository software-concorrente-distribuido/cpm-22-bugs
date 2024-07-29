import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputsModule } from './inputs/inputs.module';
import { HeaderComponent } from './header/header.component';
import { EtherNavigationComponent } from './ether-navigation/ether-navigation.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from './forms/forms.module';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { DialogsModule } from './dialogs/dialogs.module';
import { ButtonsModule } from './buttons/buttons.module';



@NgModule({
  declarations: [
    HeaderComponent,
    EtherNavigationComponent,
    SplashScreenComponent,
    SnackbarComponent
  ],
  imports: [
    CommonModule,
    InputsModule,
    RouterModule,
    FormsModule,
    ButtonsModule,
    DialogsModule
  ],
  exports: [
    InputsModule,
    HeaderComponent,
    EtherNavigationComponent,
    FormsModule,
    ButtonsModule,
    DialogsModule,
    SplashScreenComponent,
    SnackbarComponent,
  ]
})
export class ComponentsModule { }
