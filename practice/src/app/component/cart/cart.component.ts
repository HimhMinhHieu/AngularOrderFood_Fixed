import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { MyCartService } from 'src/app/Service/my-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  carts: any = {};
  constructor(private cartService: MyCartService, private router: Router, private cookie: CookieService) { }
  carts$!: Observable<any>;
  ngOnInit(): void {
    this.carts$.subscribe(carts => {
      this.carts = Object.values(carts);
    });
  }
}
