import { Component, OnInit } from '@angular/core';
import { AdminLayoutServiceService } from 'src/app/data/service/main-service/admin-layout-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  role = localStorage.getItem('role');
  constructor(
    private adminLayoutServiceService: AdminLayoutServiceService,
  ) { }

  ngOnInit(): void {
    this.adminLayoutServiceService.focusMenu('dashboard');
  }



}
