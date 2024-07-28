import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './user-form/user-form.component';
import { HotelFormComponent } from './hotel-form/hotel-form.component';
import { PersonFormComponent } from './person-form/person-form.component';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '../inputs/inputs.module';
import { MediaModule } from "../media/media.module";
import { ContactFormComponent } from './contact-form/contact-form.component';
import { AddressFormComponent } from './address-form/address-form.component';
import { RoomFormComponent } from './room-form/room-form.component';

@NgModule({
  declarations: [
    UserFormComponent,
    HotelFormComponent,
    PersonFormComponent,
    ContactFormComponent,
    AddressFormComponent,
    RoomFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularFormsModule,
    InputsModule,
    MediaModule
],
  exports: [
    UserFormComponent,
    HotelFormComponent,
    PersonFormComponent,
    RoomFormComponent
  ]
})
export class FormsModule { }
