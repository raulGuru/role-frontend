import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'auth', 
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'access', 
    loadChildren: () => import('./access-util/access-util.module').then(m => m.AccessUtilModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'ituser', 
    loadChildren: () => import('./it-user-tools/it-user-tools.module').then(m => m.ItUserToolsModule),
    canLoad: [AuthGuard]
  },
  { path: '', pathMatch: 'full', redirectTo: 'auth' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
