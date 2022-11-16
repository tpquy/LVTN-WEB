import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-insufficient-permission',
  templateUrl: './insufficient-permission.component.html',
  styleUrls: ['./insufficient-permission.component.scss']
})
export class InsufficientPermissionComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }
  logout() {
    this.authService.logout();
  }

}
