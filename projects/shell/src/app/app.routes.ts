import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { HomeComponent } from './pages/home/home.component';

export const shellRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'mfe-users',
        loadComponent: () =>
            loadRemoteModule({
                remoteEntry: 'http://localhost:4201/remoteEntry.json',
                remoteName: 'mfe-users',
                exposedModule: './Component',
            }).then((m) => m.AppComponent),
    },
    {
        path: '**',
        component: HomeComponent,
    },
];
