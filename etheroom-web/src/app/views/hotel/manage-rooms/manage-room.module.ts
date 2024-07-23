import { NgModule } from '@angular/core';
import { RoomDetailsComponent } from './room-details/room-details.component';
import { AddRoomComponent } from './add-room/add-room.component';
import { MatTabsModule } from '@angular/material/tabs';
import { EtherIconTextComponent } from '../../../shared/components/ether-icon-text/ether-icon-text.component';
import { InputsModule } from '../../../shared/components/inputs/inputs.module';
import { SharedModule } from '../../../shared/shared.module';
import { EtherDialogComponent } from '../../../shared/components/ether-dialog/ether-dialog.component';
import { EtherFilterComponent } from '../../../shared/components/filter/ether-filter.component';
import { EtherPageComponent } from '../../../shared/components/containers/ether-page/ether-page.component';
import { RouterOutlet } from '@angular/router';
import { ManageRoomsComponent } from './manage-rooms.component';
import { EtherButtonIconComponent } from '../../../shared/components/ether-button-icon/ether-button-icon.component';
import { EtherTableModule } from '../../../shared/components/ether-table/ether-table.module';
import { EtherButtonTextIconComponent } from '../../../shared/components/ether-button-text-icon/ether-button-text-icon.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RoomDetailsComponent,
    ManageRoomsComponent,
    AddRoomComponent
  ],
  imports: [
    FormsModule,
    InputsModule,
    SharedModule,
    RouterOutlet,
    MatTabsModule,
    MatTableModule,
    EtherTableModule,
    EtherPageComponent,
    ReactiveFormsModule,
    EtherDialogComponent,
    EtherFilterComponent,
    EtherIconTextComponent,
    EtherButtonIconComponent,
    EtherButtonTextIconComponent,
],
  exports: [
    RoomDetailsComponent,
    ManageRoomsComponent,
    AddRoomComponent,
    EtherFilterComponent,
  ]
})
export class ManageRoomModule { }
