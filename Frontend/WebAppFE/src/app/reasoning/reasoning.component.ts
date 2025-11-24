import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { RdfService } from '../rdf-service.service';

@Component({
  selector: 'app-reasoning',
  standalone: true,
  imports: [MatExpansionModule, CommonModule, MatButtonModule],
  templateUrl: './reasoning.component.html',
  styleUrl: './reasoning.component.css',
})
export class ReasoningComponent {
  rdfService = inject(RdfService);
  reasoningDone = false;
  reasoningResponse = '';

  performReasoning(): void {
    this.rdfService.applyReasoning().subscribe({
      next: (response: string) => {
        console.log('Reasoning Success:', response);
        this.reasoningResponse = response;
        this.reasoningDone = true;
      },
      error: (err) => {
        console.error('Eroare la aplicarea raționamentului:', err);
      },
    });
  }
}
