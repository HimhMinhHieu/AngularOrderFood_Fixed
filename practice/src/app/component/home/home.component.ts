import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiService, endpoints } from 'src/app/Config/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public foods:any = [];
  constructor(private apis: ApiService, private cookie: CookieService){ }
  ngOnInit(): void {
    this.apis.get(endpoints.foods).subscribe((data) => {
      this.foods = data
    })
  }
}
