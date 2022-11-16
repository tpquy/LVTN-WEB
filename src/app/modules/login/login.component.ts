import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });


  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onLogin(){
    const formObj = this.loginForm.getRawValue();
    console.log(formObj)
    this.login(formObj.username, formObj.password);
  }

  login(username, password){
    // Let AuthService process login authentication
    // this.authService.login(username, password);
  }

}
