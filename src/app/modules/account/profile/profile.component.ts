import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm = new FormGroup({
    fullname: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    birth: new FormControl(''),
    gender: new FormControl(''),
  });

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    let formObj = this.profileForm.getRawValue();
    console.log(formObj);
  }

}
