import { Component, Inject,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-alert',
  templateUrl: './modal-alert.component.html',
  styleUrls: ['./modal-alert.component.scss']
})
export class ModalAlertComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public aData: { title: string, description: string },
    public dialogRef: MatDialogRef<ModalAlertComponent>,
  ) { }

  ngOnInit() {
  }

}
