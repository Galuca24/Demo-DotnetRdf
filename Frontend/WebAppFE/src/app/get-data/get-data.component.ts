import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { Triplet } from '../triplet-model';
import { RdfService } from '../rdf-service.service';

@Component({
  selector: 'app-get-data',
  standalone: true,
  imports: [MatExpansionModule, CommonModule, MatButtonModule],
  templateUrl: './get-data.component.html',
  styleUrl: './get-data.component.css',
})
export class GetDataComponent {
  rdfService = inject(RdfService);
  data: Triplet[] = [
    {
      firstPersonName: 'Alice',
      relationship: 'friends with',
      secondPersonName: 'Bob',
    },
    {
      firstPersonName: 'Charlie',
      relationship: 'works for',
      secondPersonName: 'David',
    },
  ];
  dataFetched = false;

  fetchData(): void {
    this.rdfService.getAllTriples().subscribe({
      next: (results: any) => {
        this.data = results;
        this.dataFetched = true;
      },
      error: (err) => {
        this.data = [];
        this.dataFetched = true;
      },
    });
    this.dataFetched = true;
  }
}
