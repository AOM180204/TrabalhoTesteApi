import { inject, Injectable } from '@angular/core';
import {WeatherInfo} from './Type';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppComponent {
  private readonly api ="https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
  private http=inject(HttpClient);

  async searchByName(data: String):Promise<WeatherInfo[]> {
    const url=this.api+data+"/"+this.getDates().hoje+"/"+this.getDates().depoisDeAmanha+"/?key=T2ASB9T7C45F3992AS7JC5JER";
    try{
      const response = await firstValueFrom(this.http.get<any>(url));
      const retorno= [{
          city: response.address,
          MinTemperature: response.days[0].tempmin,
          MaxTemperature: response.days[0].tempmax,
          condition:response.days[0].conditions,
          Day:response.days[0].datetime
      }, {city:response.city, MinTemperature: response.days[1].tempmin, MaxTemperature: response.days[1].tempmax, condition:response.days[1].conditions, Day:response.days[0].datetime},
        {city:response.city, MinTemperature: response.days[2].tempmin, MaxTemperature: response.days[2].tempmax,condition:response.days[2].conditions, Day:response.days[0].datetime}];
      console.log(response);
      return retorno as WeatherInfo[];
    }catch(err){
      console.error("Error while fetching data: ", err);
      return {} as WeatherInfo[];
    }
  }

   getDates() {
    const hoje = new Date();

    // formata para YYYY-MM-DD
    const formatDate = (d: Date) => d.toISOString().split("T")[0];

    // data de hoje
    const hojeFormatado = formatDate(hoje);

    // data de depois de amanhã (hoje + 2 dias)
    const depoisDeAmanha = new Date(hoje);
    depoisDeAmanha.setDate(hoje.getDate() + 2);
    const depoisDeAmanhaFormatado = formatDate(depoisDeAmanha);

    return { hoje: hojeFormatado, depoisDeAmanha: depoisDeAmanhaFormatado };
  }

}
