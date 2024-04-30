import { Component, Input } from '@angular/core';
import { WeatherDataService } from '../services/weather-data.service';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html'
})
export class WeatherComponent {
  temperature: number;
  isDay: number;
  precipitation: number
  data: any;

  constructor(private weatherDataService: WeatherDataService) { }
  ngOnInit(): void {
    this.weatherDataService.weatherDataObs.subscribe(dataMeteo => {

      switch (dataMeteo) {
        case 0:
          this.data = "Bel tempo";
          break;
        case 1:
          this.data = "Prevalentemente sereno";
          break;
        case 2:
          this.data = "Parzialmente nuvoloso";
          break;
        case 3:
          this.data = "Nuvoloso";
          break;
        case 45:
          this.data = "Nebbia";
          break;
        case 48:
          this.data = "Nebbia con brina";
          break;
        case 51:
          this.data = "Pioggerellina leggera";
          break;
        case 53:
          this.data = "Pioggerellina moderata";
          break;
        case 55:
          this.data = "Pioggerellina intensa";
          break;
        case 56:
          this.data = "Pioggerellina gelida leggera";
          break;
        case 57:
          this.data = "Pioggerellina gelida densa";
          break;
        case 61:
          this.data = "Pioggia debole";
          break;
        case 63:
          this.data = "Pioggia moderata";
          break;
        case 65:
          this.data = "Pioggia forte";
          break;
        case 66:
          this.data = "Pioggia gelata leggera";
          break;
        case 67:
          this.data = "Pioggia gelata pesante";
          break;
        case 71:
          this.data = "Nevicata debole";
          break;
        case 73:
          this.data = "Nevicata moderata";
          break;
        case 75:
          this.data = "Nevicata forte";
          break;
        case 77:
          this.data = "Granelli di neve";
          break;
        case 80:
          this.data = "Rovesci di pioggia deboli";
          break;
        case 81:
          this.data = "Rovesci di pioggia moderati";
          break;
        case 82:
          this.data = "Rovesci di pioggia violenti";
          break;
        case 85:
          this.data = "Rovesci di neve deboli";
          break;
        case 86:
          this.data = "Rovesci di neve forti";
          break;
        case 95:
          this.data = "Temporale";
          break;
        case 96:
          this.data = "Temporale con grandine lieve";
          break;
        case 99:
          this.data = "Temporale con grandine forte";
          break;
        default:
          this.data = "La variabile non corrisponde a nessun caso specificato";
      }
    });
  }
}
