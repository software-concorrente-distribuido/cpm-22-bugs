import { Routes } from '@angular/router';
import { HomeComponent } from './module/home/home.component';
import { AllHotelsComponent } from './module/all-hotels/all-hotels.component';
import { ExploreCitiesComponent } from './module/explore-cities/explore-cities.component';
import { AboutComponent } from './module/about/about.component';
import { FaqComponent } from './module/faq/faq.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
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
    }
];
