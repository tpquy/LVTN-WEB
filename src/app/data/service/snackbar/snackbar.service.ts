import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/shared/components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  openSnackBar(status: number, message: string, content: string, panelClass: string, expiredTime: number) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {
        message,
        content,
        status // 1: success - 0: error
      },
      panelClass,
      duration: expiredTime,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
  }

}
