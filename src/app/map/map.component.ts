import { Component, Output } from '@angular/core';
import { fetchWeatherApi } from 'openmeteo';
import { WeatherDataService } from '../services/weather-data.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html'
})
export class MapComponent {

  label: string;
  meteoCode: number;
  constructor(private weatherDataService: WeatherDataService) {}

  options: google.maps.MapOptions = {
    mapId: "map",
    center: { lat: 52, lng: 13 },
    zoom: 4,
  };

  async markerClicked(label: string, lat: number, lng: number) {
    const data = await this.fetchWeatherData(lat, lng);
    this.weatherDataService.setWeatherData(this.meteoCode);
  }

  private async fetchWeatherData(lat: number, lng: number): Promise<any> {
    const params = {
      "latitude": lat,
      "longitude":lng,
      "current": ["temperature_2m", "is_day", "precipitation", "weather_code", "wind_speed_10m"],
      "timezone": "auto"
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    // Helper function to form time ranges
    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    // Process first location. Add a for-loop for multiple locations or weather models
    for (let i = 0; i < responses.length; i++) {
      const response = responses[i];


      // Attributes for timezone and location
      const utcOffsetSeconds = response.utcOffsetSeconds();
      const timezone = response.timezone();
      const timezoneAbbreviation = response.timezoneAbbreviation();
      const latitude = response.latitude();
      const longitude = response.longitude();

      const current = response.current()!;

      // Note: The order of weather variables in the URL query and the indices below need to match!
      const weatherData = {
        current: {
          time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
          temperature2m: current.variables(0)!.value(),
          isDay: current.variables(1)!.value(),
          precipitation: current.variables(2)!.value(),
          weatherCode: current.variables(3)!.value(),
          windSpeed10m: current.variables(3)!.value(),
        },
      };
      this.meteoCode=weatherData.current.weatherCode;
    }
  }
  toggleHighlight(markerView, property) {
    if (markerView.content.classList.contains("highlight")) {
      markerView.content.classList.remove("highlight");
      markerView.zIndex = null;
    } else {
      markerView.content.classList.add("highlight");
      markerView.zIndex = 1;
    }
  }

  /*async markerClicked(label: string, lat: number, lng: number) {
   
    const params = {
      "latitude": lat,
      "longitude":lng,
      "current": ["temperature_2m", "is_day", "precipitation", "wind_speed_10m"],
      "timezone": "auto"
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    // Helper function to form time ranges
    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    // Process first location. Add a for-loop for multiple locations or weather models
    for (let i = 0; i < responses.length; i++) {
      const response = responses[i];


      // Attributes for timezone and location
      const utcOffsetSeconds = response.utcOffsetSeconds();
      const timezone = response.timezone();
      const timezoneAbbreviation = response.timezoneAbbreviation();
      const latitude = response.latitude();
      const longitude = response.longitude();

      const current = response.current()!;

      // Note: The order of weather variables in the URL query and the indices below need to match!
      const weatherData = {
        current: {
          time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
          temperature2m: current.variables(0)!.value(),
          isDay: current.variables(1)!.value(),
          precipitation: current.variables(2)!.value(),
          windSpeed10m: current.variables(3)!.value(),
        },

      };
      this.data= weatherData;
      
      console.log(this.data);
    }
  }
*/
  markers: any[] = [
    { lat: 38.7167, lng: -9.1333, label: "Lisbona" },
    { lat: 40.4164, lng: -3.7025, label: "Madrid" },
    { lat: 48.8533, lng: 2.3488, label: "Parigi" },
    { lat: 50.8503, lng: 4.3517, label: "Bruxelles" },
    { lat: 52.373, lng: 4.8939, label: "Amsterdam" },
    { lat: 49.6117, lng: 6.1319, label: "Lussemburgo" },
    { lat: 35.1753, lng: 33.3643, label: "Nicosia" },
    { lat: 41.8917, lng: 12.5113, label: "Roma" },
    { lat: 35.8994, lng: 14.5146, label: "La Valletta" },
    { lat: 48.2088, lng: 16.3728, label: "Vienna" },
    { lat: 52.5244, lng: 13.4105, label: "Berlino" },
    { lat: 52.2309, lng: 21.0067, label: "Varsavia" },
    { lat: 55.6761, lng: 12.5683, label: "Copenaghen" },
    { lat: 59.3326, lng: 18.0649, label: "Stoccolma" },
    { lat: 56.9465, lng: 24.1042, label: "Riga" },
    { lat: 54.6883, lng: 25.2796, label: "Vilnius" },
    { lat: 59.4369, lng: 24.7536, label: "Tallinn" },
    { lat: 51.5083, lng: -0.1257, label: "Londra" },
    { lat: 53.3331, lng: -6.2489, label: "Dublino" },
    { lat: 44.4323, lng: 26.1063, label: "Bucarest" },
    { lat: 37.9795, lng: 23.7162, label: "Atene" },
    { lat: 45.8144, lng: 15.9784, label: "Zagabria" },
    { lat: 46.0508, lng: 14.506, label: "Lubiana" },
    { lat: 47.4979, lng: 19.0402, label: "Budapest" },
    { lat: 50.0878, lng: 14.4205, label: "Praga" },
    { lat: 48.1486, lng: 17.1077, label: "Bratislava" },
    { lat: 60.1695, lng: 24.9354, label: "Helsinki" },
    { lat: 42.6977, lng: 23.3219, label: "Sofia" }
  ]
  
}