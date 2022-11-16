import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-base-layout-header',
  templateUrl: './base-layout-header.component.html',
  styleUrls: ['./base-layout-header.component.scss']
})
export class BaseLayoutHeaderComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }
  onLogout() {
    this.authService.logout();
  }
}
