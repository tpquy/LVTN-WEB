import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewAddressComponent } from '../account/list-address/dialog/add-new-address/add-new-address.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
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

}
