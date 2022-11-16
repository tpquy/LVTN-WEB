import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  dialogTitle: string;
  dialogContent: string;
  isWarning = false;
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogModel,
  ) {
    this.dialogTitle = data.dialogTitle;
    this.dialogContent = data.dialogContent;
    this.isWarning = !!data.isWarning ? data.isWarning : this.isWarning;
  }

  ngOnInit(): void { }

  onConfirm() {
    this.dialogRef.close(true);
  }

  onReject() {
    this.dialogRef.close(false);
  }

  onDismiss() {
    this.dialogRef.close();
  }

}

export class ConfirmationDialogModel {
  constructor(public dialogTitle: string, public dialogContent: string, public isWarning?: boolean) {
  }
}