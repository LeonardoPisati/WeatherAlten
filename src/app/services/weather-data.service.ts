import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {
  weatherData = new Subject<any>();
  weatherDataObs = this.weatherData.asObservable();

  constructor() {}

  setWeatherData(data: any) {
    this.weatherData.next(data);

  }


}