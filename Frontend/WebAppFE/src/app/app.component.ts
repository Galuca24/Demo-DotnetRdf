import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddTripletComponent } from './add-triplet/add-triplet.component';
import { GetDataComponent } from './get-data/get-data.component';
import { EnterQueryComponent } from './enter-query/enter-query.component';
import { ReasoningComponent } from './reasoning/reasoning.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AddTripletComponent,
    GetDataComponent,
    EnterQueryComponent,
    ReasoningComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'WebAppFE';
}
