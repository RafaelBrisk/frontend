import { Routes } from '@angular/router';
import { LanchesComponent } from './modulos/lanches/lanches.component';
import { MenuComponent } from './modulos/menu/menu.component';

export const routes: Routes = [
  { path: 'menu', component: MenuComponent },
  { path: 'lanches', component: LanchesComponent },
  { path: '', redirectTo: '/menu', pathMatch: 'full' },
  { path: '**', redirectTo: '/menu' }
];
