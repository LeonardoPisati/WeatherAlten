import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';
import { AuthComponent } from './auth/auth.component';
import { WeatherHistoryComponent } from './weather-history/weather-history.component';
import { AuthGuard } from './auth/auth.guard';
import { MapComponent } from './map/map.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/map', pathMatch: "full"},
  { path: 'weather', component: WeatherComponent,canActivate: [AuthGuard]},
  { path: 'history', component: WeatherHistoryComponent},
  { path: 'auth', component: AuthComponent},
  { path: 'map', component: MapComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
