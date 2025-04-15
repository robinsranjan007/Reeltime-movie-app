import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopSectionComponent } from './topsection/topsection.component';
import { UppermidsectionComponent } from './uppermidsection/uppermidsection.component';
import { LowerMidSectionComponent } from "./lowermidsection/lowermidsection.component";
import { BottomSectionComponent } from './bottomsection/bottomsection.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TopSectionComponent,
    UppermidsectionComponent,
    LowerMidSectionComponent,
    BottomSectionComponent
],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {}
