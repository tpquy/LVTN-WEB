import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { SilentCheckSsoComponent } from './components/silent-check-sso/silent-check-sso.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [SilentCheckSsoComponent, SpinnerComponent, SnackbarComponent, ConfirmDialogComponent],
  imports: [
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    NgxPaginationModule
  ],
  exports: [
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    NgxPaginationModule
  ]
})
export class SharedModule { }
