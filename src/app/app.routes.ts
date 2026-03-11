import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: 'auth', 
    loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES) 
  },
  { 
    path: '', 
    loadChildren: () => import('./pages/pages.routes').then(m => m.PAGES_ROUTES) 
  },
  { path: '**', redirectTo: '' }
];
