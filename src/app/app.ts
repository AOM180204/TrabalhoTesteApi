import {Component, Inject, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import {WeatherInfo} from './Type';
import {AppComponent} from './app.component';


@Component({
  selector: 'app-root',
  imports: [MatCardModule, MatButtonModule,FormsModule, MatFormFieldModule, MatInputModule,MatIconModule, MatDividerModule,MatTableModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  public WInfo: WeatherInfo[] = [];
  public searchValue='';
  public displayedColumn: string[] = ['Name', 'Clima', 'Temp. Max', 'Temp. Min', 'Dia'];
  public Source:WeatherInfo[] = [];

  container = document.getElementById("container");



  service= inject(AppComponent);

  public async searchText(){
    if (!this.searchValue) return;
    this.WInfo=await this.service.searchByName(this.searchValue);
    console.log(this.WInfo);
    this.Source.forEach((source:WeatherInfo) => {})
    this.addCard()

  }

  public addCard(){
    this.WInfo.forEach(local => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
    <h3>${local.city}</h3>
    <p>Idade: ${local.MinTemperature}</p>
    <p>Idade: ${local.MaxTemperature}</p>
    <p>Idade: ${local.condition}</p>
    <p>Idade: ${local.Day}</p>
  `;

      this.container?.append(card);
    });

  }

}
