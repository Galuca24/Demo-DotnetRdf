import { CommonModule, KeyValuePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RdfService } from '../rdf-service.service';

export interface SparqlQueryResult {
  [key: string]: string;
}
@Component({
  selector: 'app-enter-query',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    MatButtonModule,
    KeyValuePipe
  ],
  templateUrl: './enter-query.component.html',
  styleUrl: './enter-query.component.css',
})
export class EnterQueryComponent {
  rdfService = inject(RdfService);
  customQuery: string = '';
  queryResults: SparqlQueryResult[] | null = null;

  onSubmitQuery(): void {
    if (!this.customQuery) {
      console.warn('Query field is required.');
      return;
    }

    this.rdfService.executeSparqlQuery(this.customQuery).subscribe({
      next: (results) => {
        console.log('Rezultate Backend:', results);
        this.queryResults = results;
      },
      error: (err) => {
        this.queryResults = null;
        console.error('Error executing query:', err);
      },
    });
  }
}
