import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AccountService } from 'src/app/data/service/account-service/account.service';

@Component({
  selector: 'app-add-new-address',
  templateUrl: './add-new-address.component.html',
  styleUrls: ['./add-new-address.component.scss']
})
export class AddNewAddressComponent implements OnInit {

  addNewAddressForm = new FormGroup({
    name: new FormControl(''),
    phone: new FormControl(''),
    mail: new FormControl(''),
    province: new FormControl(''),
    district: new FormControl(''),
    ward: new FormControl(''),
    address: new FormControl(''),
    setDefault: new FormControl(''),
  });

  provinceList = [];
  districtList = [];
  wardList = [];

  constructor(
    private accountService:AccountService,
    public dialogRef: MatDialogRef<AddNewAddressComponent>,
  ) { }

  ngOnInit(): void {
    this.getProvinceList();
  }

  onSubmit(){
    let formObj = this.addNewAddressForm.getRawValue();
    console.log(formObj);
    this.onDismiss();
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }

  getProvinceList(){
    console.log('getProvinceList');
    this.accountService.getProvinceList().subscribe(data => {
      data.forEach(item => {
        this.provinceList.push({
          code: item.code,
          name: item.name
        })
      });
    })
  }



  getDistrictList(code){
    console.log('getDistrictList');
    this.accountService.getProvinceList().subscribe(data => {
      data.forEach(item => {
        this.districtList.push({
          code: item.code,
          name: item.name
        })
      });
    })
  }

  getWardList(code){
    console.log('getWardList');
    this.accountService.getProvinceList().subscribe(data => {
      data.forEach(item => {
        this.wardList.push({
          code: item.code,
          name: item.name
        })
      });
    })
  }

}
