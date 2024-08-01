import { AuthGuard } from './core/guards/auth.guard';
import { Routes } from '@angular/router';
import { YourBookingsComponent } from './views/guest/your-bookings/your-bookings.component';
import { RegisterComponent } from './views/shared/register/register.component';
import { LoginComponent } from './views/shared/login/login.component';
import { HomeComponent } from './views/shared/home/home.component';
import { AllHotelsComponent } from './views/shared/all-hotels/all-hotels.component';
import { ExploreCitiesComponent } from './views/shared/explore-cities/explore-cities.component';
import { AboutComponent } from './views/shared/about/about.component';
import { FaqComponent } from './views/shared/faq/faq.component';
import { ManageRoomsComponent } from './views/hotel/manage-rooms/manage-rooms.component';
import { RoomDetailsComponent } from './views/hotel/manage-rooms/room-details/room-details.component';
import { MyBookingsComponent } from './views/hotel/my-bookings/my-bookings.component';
import { RoomPageComponent } from './views/shared/room-page/room-page.component';
import { HotelGuard, PersonGuard } from './core/guards/user.guard';
import { ProfileComponent } from './views/shared/profile/profile.component';
import { Booking } from './core/models/booking/booking.model';
import { BookingComponent } from './views/guest/booking/booking.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '',
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'sign-in', component: LoginComponent },
            { path: 'sign-up', component: RegisterComponent },
            { path: 'all-hotels', component: AllHotelsComponent },
            { path: 'explore-cities', component: ExploreCitiesComponent },
            { path: 'faq', component: FaqComponent },
            { path: 'about-us', component: AboutComponent },
            { path: 'room-page', component: RoomPageComponent }
            // { path: 'profile', component: ProfileComponent }
        ]
    },
    {
        path: 'guest',
        children: [
            { path: 'all-hotels', component: AllHotelsComponent },
            { path: 'your-bookings', component: YourBookingsComponent },
            { path: 'room-details/:id', component: RoomDetailsComponent },
            { path: 'booking/:hotelRoomId', component: BookingComponent },
            { path: 'profile', component: ProfileComponent }
        ],
        canActivate: [AuthGuard, PersonGuard]
    },
    {
        path: 'hotel',
        children: [
            { path: 'manage-rooms', component: ManageRoomsComponent },
            { path: 'manage-rooms/room-details/:id', component: RoomDetailsComponent },
            { path: 'my-bookings', component: MyBookingsComponent },
            { path: 'profile', component: ProfileComponent }
        ],
        canActivate: [AuthGuard, HotelGuard]
    }
];
