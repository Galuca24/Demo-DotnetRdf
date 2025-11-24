import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { RdfService } from '../rdf-service.service';

@Component({
  selector: 'app-get-export-data',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatFormFieldModule,
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './get-export-data.component.html',
  styleUrl: './get-export-data.component.css',
})
export class GetExportDataComponent {
  rdfService = inject(RdfService);

  exportFormat: string = 'turtle';
  exportData: string | null = null;

  formats: string[] = ['turtle', 'jsonld', 'xml', 'ntriples'];

  onExportData(): void {
    this.exportData = null;

    this.rdfService.exportRdfGraph(this.exportFormat).subscribe({
      next: (content: string) => {
        this.exportData = content;
        console.log(`Exported graph content (${this.exportFormat})`);
      },
      error: (err) => {
        this.exportData = `ERROR: Could not export graph. Details: ${
          err.message || 'Check console.'
        }`;
        console.error('Export Error:', err);
      },
    });
  }
}
