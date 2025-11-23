import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RdfService } from '../rdf-service.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-triplet',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './add-triplet.component.html',
  styleUrl: './add-triplet.component.css',
})
export class AddTripletComponent {
  rdfService = inject(RdfService);
  private snackBar = inject(MatSnackBar);

  firstPersonName: string = '';
  relationship: string = '';
  secondPersonName: string = '';

  onSubmit() {
    const newTriplet = {
      firstPersonName: this.firstPersonName,
      relationship: this.relationship,
      secondPersonName: this.secondPersonName,
    };

    this.rdfService.addTriplet(newTriplet).subscribe({
      next: (response) => {
        this.snackBar.open(`✅ Succes: ${response}`, 'Close', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['success-snackbar'],
        });
      },
      error: (err) => {
        this.snackBar.open(
          `❌ Error: Could not add the triple. Details: ${err.message}`,
          'Close',
          {
            duration: 6000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
          }
        );
      },
    });
  }

  onClear(form: NgForm) {
    form.resetForm();

    this.firstPersonName = '';
    this.relationship = '';
    this.secondPersonName = '';

    console.log('Form cleared.');
  }
}
