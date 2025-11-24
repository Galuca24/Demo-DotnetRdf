// dbpedia-query.component.ts

import { CommonModule } from '@angular/common';
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
  selector: 'app-dbpedia-query',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './dbpedia-query.component.html',
  styleUrl: './dbpedia-query.component.css',
})
export class DbpediaQueryComponent {
  rdfService = inject(RdfService);
  dbpediaQuery: string = '';
  queryResults: SparqlQueryResult[] | null = null;
  displayedColumns: string[] = [];

  onSubmitDbpediaQuery(): void {
    if (!this.dbpediaQuery) {
      console.warn('The query cannot be empty.');
      return;
    }

    this.rdfService.queryDbpedia(this.dbpediaQuery).subscribe({
      next: (results: SparqlQueryResult[]) => {
        this.queryResults = results;

        if (results && results.length > 0) {
          this.displayedColumns = Object.keys(results[0]);
        } else {
          this.displayedColumns = [];
        }

        console.log('DBpedia results received:', results);
      },
      error: (err) => {
        this.queryResults = null;
        this.displayedColumns = [];
        console.error('DBpedia Query Error:', err);
      },
    });
  }
}
