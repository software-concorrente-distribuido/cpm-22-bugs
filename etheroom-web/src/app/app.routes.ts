import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { AllHotelsComponent } from './views/all-hotels/all-hotels.component';
import { ExploreCitiesComponent } from './views/explore-cities/explore-cities.component';
import { AboutComponent } from './views/about/about.component';
import { FaqComponent } from './views/faq/faq.component';

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
