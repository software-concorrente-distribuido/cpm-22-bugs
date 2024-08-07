import { NgModule } from '@angular/core';
import { RoomDetailsComponent } from './room-details/room-details.component';
import { MatTabsModule } from '@angular/material/tabs';
import { EtherIconTextComponent } from '../../../shared/components/ether-icon-text/ether-icon-text.component';
import { InputsModule } from '../../../shared/components/inputs/inputs.module';
import { SharedModule } from '../../../shared/shared.module';
import { EtherDialogComponent } from '../../../shared/components/ether-dialog/ether-dialog.component';
import { EtherFilterComponent } from '../../../shared/components/filter/ether-filter.component';
import { EtherPageComponent } from '../../../shared/components/containers/ether-page/ether-page.component';
import { RouterOutlet } from '@angular/router';
import { ManageRoomsComponent } from './manage-rooms.component';
import { EtherTableModule } from '../../../shared/components/ether-table/ether-table.module';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from '../../../shared/components/buttons/buttons.module';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '../../../shared/components/forms/forms.module';
import { MediaModule } from '../../../shared/components/media/media.module';



@NgModule({
  declarations: [
    RoomDetailsComponent,
    ManageRoomsComponent
  ],
  imports: [
    FormsModule,
    InputsModule,
    SharedModule,
    RouterOutlet,
    MatTabsModule,
    MatTableModule,
    MatSelectModule,
    MatSlideToggleModule,
    MediaModule,
    EtherTableModule,
    EtherPageComponent,
    ReactiveFormsModule,
    EtherDialogComponent,
    EtherFilterComponent,
    EtherIconTextComponent,
    ButtonsModule
],
  exports: [
    RoomDetailsComponent,
    ManageRoomsComponent,
    EtherFilterComponent,
  ]
})
export class ManageRoomModule { }
