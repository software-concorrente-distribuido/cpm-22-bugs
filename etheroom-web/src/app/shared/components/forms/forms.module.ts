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
import { MatSelectModule } from '@angular/material/select';
import { ConvenienceFormComponent } from './convenience-form/convenience-form.component';
import {
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    RoomFormComponent,
    UserFormComponent,
    HotelFormComponent,
    PersonFormComponent,
    ContactFormComponent,
    AddressFormComponent,
    ConvenienceFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularFormsModule,
    MatSelectModule,
    MatSlideToggleModule,
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
