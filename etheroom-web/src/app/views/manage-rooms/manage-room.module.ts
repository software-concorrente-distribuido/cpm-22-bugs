import { NgModule } from '@angular/core';
import { RoomDetailsComponent } from './room-details/room-details.component';
import { AddRoomComponent } from './add-room/add-room.component';
import { MatTabsModule } from '@angular/material/tabs';
import { EtherIconTextComponent } from '../../shared/components/ether-icon-text/ether-icon-text.component';
import { InputsModule } from '../../shared/components/inputs/inputs.module';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    RoomDetailsComponent,
    AddRoomComponent
  ],
  imports: [
    InputsModule,
    SharedModule,
    MatTabsModule,
    EtherIconTextComponent
  ],
  exports: [
    RoomDetailsComponent,
    AddRoomComponent
  ]
})
export class ManageRoomModule { }
