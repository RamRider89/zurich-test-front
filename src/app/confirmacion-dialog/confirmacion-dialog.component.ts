import { Component, Inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
// Modal
import { MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacion-dialog',
  templateUrl: './confirmacion-dialog.component.html',
  styleUrls: ['./confirmacion-dialog.component.css'],
  standalone: true,
  imports: [
        MatButtonModule, 
        MatInputModule, 
        MatIconModule,
        MatDialogModule, 
        MatDialogTitle, 
        MatDialogContent
  ]
})
export class ConfirmacionDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmacionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mensaje: string, action: string, target: any}
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {}
}