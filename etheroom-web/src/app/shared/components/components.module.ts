import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputsModule } from './inputs/inputs.module';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from './forms/forms.module';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { DialogsModule } from './dialogs/dialogs.module';
import { ButtonsModule } from './buttons/buttons.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';



@NgModule({
  declarations: [
    HeaderComponent,
    SplashScreenComponent,
    SnackbarComponent
  ],
  imports: [
    CommonModule,
    InputsModule,
    RouterModule,
    FormsModule,
    ButtonsModule,
    DialogsModule,
    MatMenuModule,
    MatIconModule
  ],
  exports: [
    InputsModule,
    HeaderComponent,
    FormsModule,
    ButtonsModule,
    DialogsModule,
    SplashScreenComponent,
    SnackbarComponent,
  ]
})
export class ComponentsModule { }
