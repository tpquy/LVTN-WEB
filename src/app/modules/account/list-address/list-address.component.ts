import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddNewAddressComponent } from './dialog/add-new-address/add-new-address.component';
import { UpdateAddressComponent } from './dialog/update-address/update-address.component';

@Component({
  selector: 'app-list-address',
  templateUrl: './list-address.component.html',
  styleUrls: ['./list-address.component.scss']
})
export class ListAddressComponent implements OnInit {

  

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddNewAddressComponent, {
      width: '500px',
      height: '60%',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openUpdateDialog() {
    const dialogRef = this.dialog.open(UpdateAddressComponent, {
      width: '500px',
      height: '60%',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  

}
