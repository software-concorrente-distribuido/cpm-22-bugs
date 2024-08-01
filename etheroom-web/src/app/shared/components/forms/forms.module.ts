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
import { TouristSpotFormComponent } from './tourist-spot-form/tourist-spot-form.component';
import { ConvenienceFormComponent } from './convenience-form/convenience-form.component';
import { RoomFormComponent } from './room-form/room-form.component';
import { MatSelectModule } from '@angular/material/select';
import {
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { GuestFormComponent } from './guest-form/guest-form.component';

@NgModule({
  declarations: [
    RoomFormComponent,
    UserFormComponent,
    HotelFormComponent,
    PersonFormComponent,
    ContactFormComponent,
    AddressFormComponent,
    TouristSpotFormComponent,
    ConvenienceFormComponent,
    GuestFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularFormsModule,
    MatSelectModule,
    MatSlideToggleModule,
    InputsModule,
    MediaModule,
    NgxMaskDirective, 
    NgxMaskPipe
  ],
  exports: [
    UserFormComponent,
    HotelFormComponent,
    PersonFormComponent,
    RoomFormComponent,
    ConvenienceFormComponent,
    GuestFormComponent
  ]
})
export class FormsModule { }
