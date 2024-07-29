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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from '../../../shared/components/buttons/buttons.module';



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
