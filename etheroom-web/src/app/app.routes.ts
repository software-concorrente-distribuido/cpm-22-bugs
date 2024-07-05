import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { AllHotelsComponent } from './views/all-hotels/all-hotels.component';
import { ExploreCitiesComponent } from './views/explore-cities/explore-cities.component';
import { AboutComponent } from './views/about/about.component';
import { FaqComponent } from './views/faq/faq.component';
import { ManageRoomsComponent } from './views/manage-rooms/manage-rooms.component';
import { RoomDetailsComponent } from './views/manage-rooms/room-details/room-details.component';
import { AddRoomComponent } from './views/manage-rooms/add-room/add-room.component';
import { LoginComponent } from './views/login/login.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },

    {
        path: 'sign-in',
        component: LoginComponent
    },

    {
        path: 'sign-up',
        component: LoginComponent
    },

    {
        path: 'home',
        component: HomeComponent
    },

    {
        path: 'all-hotels',
        component: AllHotelsComponent
    },

    {
        path: 'explore-cities',
        component: ExploreCitiesComponent
    },

    {
        path: 'about-us',
        component: AboutComponent
    },

    {
        path: 'faq',
        component: FaqComponent
    },

    {
        path: 'manage-rooms',
        children: [
            { path: '', component: ManageRoomsComponent },
            { path: 'room-details', component: RoomDetailsComponent },
            { path: 'add-room', component: AddRoomComponent }
        ]
    }
];
