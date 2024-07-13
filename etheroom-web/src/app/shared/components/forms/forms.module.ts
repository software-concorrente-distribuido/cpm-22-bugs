import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './user-form/user-form.component';
import { HotelFormComponent } from './hotel-form/hotel-form.component';
import { PersonFormComponent } from './person-form/person-form.component';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserFormComponent,
    HotelFormComponent,
    PersonFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularFormsModule
  ],
  exports: [
    UserFormComponent,
    HotelFormComponent,
    PersonFormComponent
  ]
})
export class FormsModule { }
