import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LDAPOrphanFinderPageComponent } from './pages/ldap-orphan-finder/ldap-orphan-finder-page.component';

const routes: Routes = [
  { path: 'ldap-orphan-finder-page', component: LDAPOrphanFinderPageComponent },
  { path: 'home-page', component: HomePageComponent },
  { path: '', redirectTo: '/ldap-orphan-finder-page', pathMatch: 'full' },
  // { path: '', redirectTo: '/home-page', pathMatch: 'full' },
  { path: '**', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
