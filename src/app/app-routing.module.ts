import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoyersParisLeafletComponent } from './loyers-paris-leaflet/loyers-paris-leaflet.component';

const routes: Routes = [
  {component: LoyersParisLeafletComponent, path:"loyers-paris-leaflet"},
  {component: HomeComponent, path:"home"},
  { path: "", redirectTo: "home",pathMatch: 'full' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }